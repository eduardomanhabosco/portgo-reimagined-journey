package main

import (
	"context"
	"flag"
	"fmt"
	"runtime"
	"strings"
	"sync"
	"sync/atomic"
	"time"
)

const (
	charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
	maxLen  = 5
)

var (
	password string
	threads  int
)

type result struct {
	value string
}

func brute(ctx context.Context, found *atomic.Bool, attempt []byte, depth int, out chan<- result) {
	if found.Load() {
		return
	}
	select {
	case <-ctx.Done():
		return
	default:
	}

	if depth == maxLen {
		if string(attempt) == password {
			if found.CompareAndSwap(false, true) {
				out <- result{value: string(attempt)}
			}
		}
		return
	}

	for i := 0; i < len(charset); i++ {
		if found.Load() {
			return
		}
		attempt[depth] = charset[i]
		brute(ctx, found, attempt, depth+1, out)
	}
}

func worker(ctx context.Context, wg *sync.WaitGroup, found *atomic.Bool, startIdx, step int, out chan<- result) {
	defer wg.Done()
	attempt := make([]byte, maxLen)
	for i := startIdx; i < len(charset); i += step {
		if found.Load() {
			return
		}
		attempt[0] = charset[i]
		brute(ctx, found, attempt, 1, out)
	}
}

func main() {
	flag.StringVar(&password, "password", "a1B9z", "senha alvo (5 chars)")
	flag.IntVar(&threads, "threads", runtime.NumCPU(), "número de goroutines de busca")
	flag.Parse()

	if len(password) != maxLen {
		panic("A senha deve ter exatamente 5 caracteres")
	}
	for _, c := range password {
		if !strings.ContainsRune(charset, c) {
			panic("Senha contém caracteres fora de [A-Za-z0-9]")
		}
	}

	runtime.GOMAXPROCS(runtime.NumCPU())
	start := time.Now()

	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	var found atomic.Bool
	out := make(chan result, 1)
	var wg sync.WaitGroup
	if threads < 1 {
		threads = 1
	}
	if threads > len(charset) {
		threads = len(charset)
	}

	for t := 0; t < threads; t++ {
		wg.Add(1)
		go worker(ctx, &wg, &found, t, threads, out)
	}

	var value string
	select {
	case r := <-out:
		value = r.value
		cancel()
	case <-ctx.Done():
	}
	wg.Wait()

	elapsed := time.Since(start).Seconds()
	if value != "" {
		fmt.Printf("Senha encontrada: %s\\n", value)
	}
	fmt.Printf("Tempo paralelo: %.6f s (threads=%d)\\n", elapsed, threads)
}
