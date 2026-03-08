#include <stdio.h>
#include <locale.h>
#include <stdlib.h>
int main() {
      system("chcp 65001 > nul"); 
    setlocale(LC_ALL, ".UTF8");
    int n, i;
    unsigned long long f = 1;
    printf("Digite um número: ");
    scanf("%d", &n);
    if (n < 0)
        printf("Fatorial não definido para negativos.\n");
    else {
        for (i = 1; i <= n; ++i) {
            f *= i;
        }
        printf("Fatorial: %llu\n", f);
    }
    return 0;
}