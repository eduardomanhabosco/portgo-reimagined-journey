CC=gcc
CFLAGS=-Wall

all: hello calculadora maior par fatorial primo soma fibonacci ordena palindromo

hello: 01_hello_world.c
	$(CC) $(CFLAGS) -o hello 01_hello_world.c

calculadora: 02_calculadora_simples.c
	$(CC) $(CFLAGS) -o calculadora 02_calculadora_simples.c

maior: 03_maior_de_tres.c
	$(CC) $(CFLAGS) -o maior 03_maior_de_tres.c

par: 04_par_ou_impar.c
	$(CC) $(CFLAGS) -o par 04_par_ou_impar.c

fatorial: 05_fatorial.c
	$(CC) $(CFLAGS) -std=c99 -o fatorial 05_fatorial.c

primo: 06_numero_primo.c
	$(CC) $(CFLAGS) -o primo 06_numero_primo.c

soma: 07_soma_dos_digitos.c
	$(CC) $(CFLAGS) -o soma 07_soma_dos_digitos.c

fibonacci: 08_fibonacci.c
	$(CC) $(CFLAGS) -o fibonacci 08_fibonacci.c

ordena: 09_ordenacao_vetor.c
	$(CC) $(CFLAGS) -o ordena 09_ordenacao_vetor.c

palindromo: 10_palindromo.c
	$(CC) $(CFLAGS) -std=c99 -o palindromo 10_palindromo.c

clean:
	rm -f hello calculadora maior par fatorial primo soma fibonacci ordena palindromo