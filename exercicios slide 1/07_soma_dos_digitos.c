#include <stdio.h>
#include <locale.h>
#include <stdlib.h>
int main() {
      system("chcp 65001 > nul"); 
    setlocale(LC_ALL, ".UTF8");
    int n, soma = 0;
    printf("Digite um número: ");
    scanf("%d", &n);
    while (n != 0) {
        soma += n % 10;
        n /= 10;
    }
    printf("Soma dos dígitos: %d\n", soma);
    return 0;
}