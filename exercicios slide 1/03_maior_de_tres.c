#include <stdio.h>
#include <locale.h>
#include <stdlib.h>
int main() {
      system("chcp 65001 > nul"); 
    setlocale(LC_ALL, ".UTF8");
    int a, b, c;
    printf("Digite três números: ");
    scanf("%d %d %d", &a, &b, &c);
    if (a >= b && a >= c)
        printf("Maior: %d\n", a);
    else if (b >= a && b >= c)
        printf("Maior: %d\n", b);
    else
        printf("Maior: %d\n", c);
    return 0;
}