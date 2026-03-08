#include <stdio.h>
#include <locale.h>
#include <stdlib.h>
int main() {
      system("chcp 65001 > nul"); 
    setlocale(LC_ALL, ".UTF8");
    float a, b;
    printf("Digite dois números: ");
    scanf("%f %f", &a, &b);
    printf("Soma: %.2f\n", a + b);
    printf("Subtração: %.2f\n", a - b);
    printf("Multiplicação: %.2f\n", a * b);
    if (b != 0)
        printf("Divisão: %.2f\n", a / b);
    else
        printf("Divisão por zero não é permitida.\n");
    return 0;
}