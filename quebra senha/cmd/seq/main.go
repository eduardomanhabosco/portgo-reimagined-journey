package main

import (
	"flag"
	"fmt"
	"strings"
	"time"
)

const (
	charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
	maxLen  = 5
)

var (
	password string
	found    bool
)

func brute(attempt []byte, depth int) {
	if found {
		return
	}
	if depth == maxLen {
		if string(attempt) == password {
			fmt.Printf("Senha encontrada: %s\n", string(attempt))
			found = true
		}
		return
	}
	for i := 0; i < len(charset); i++ {
		attempt[depth] = charset[i]
		brute(attempt, depth+1)
		if found {
			return
		}
	}
}

func main() {
	flag.StringVar(&password, "password", "a1B9z", "senha alvo (5 chars)")
	flag.Parse()
	if len(password) != maxLen {
		panic("A senha deve ter exatamente 5 caracteres")
	}
	for _, c := range password {
		if !strings.ContainsRune(charset, c) {
			panic("Senha contém caracteres fora de [A-Za-z0-9]")
		}
	}

	start := time.Now()
	attempt := make([]byte, maxLen)
	brute(attempt, 0)
	elapsed := time.Since(start).Seconds()
	fmt.Printf("Tempo sequencial: %.6f s\n", elapsed)
}
