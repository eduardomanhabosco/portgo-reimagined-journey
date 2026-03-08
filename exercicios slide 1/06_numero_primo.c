#include <stdio.h>
#include <locale.h>
#include <stdlib.h>
int main() {
      system("chcp 65001 > nul"); 
    setlocale(LC_ALL, ".UTF8");
    int n, i, primo = 1;
    printf("Digite um número: ");
    scanf("%d", &n);
    if (n <= 1) primo = 0;
    for (i = 2; i * i <= n; ++i) {
        if (n % i == 0) {
            primo = 0;
            break;
        }
    }
    if (primo)
        printf("É primo\n");
    else
        printf("Não é primo\n");
    return 0;
}