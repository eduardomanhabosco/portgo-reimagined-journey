#include <stdio.h>
#include <locale.h>
#include <stdlib.h>
int main() {
      system("chcp 65001 > nul"); 
    setlocale(LC_ALL, ".UTF8");
    int n, t1 = 0, t2 = 1, proximo;
    printf("Digite o limite da sequência de Fibonacci: ");
    scanf("%d", &n);
    while (t1 <= n) {
        printf("%d ", t1);
        proximo = t1 + t2;
        t1 = t2;
        t2 = proximo;
    }
    printf("\n");
    return 0;
}