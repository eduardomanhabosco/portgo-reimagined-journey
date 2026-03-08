#include <stdio.h>
#include <locale.h>
#include <stdlib.h>
int main() {
      system("chcp 65001 > nul"); 
    setlocale(LC_ALL, ".UTF8");
    int v[10], i, j, temp;
    printf("Digite 10 números: ");
    for (i = 0; i < 10; ++i)
        scanf("%d", &v[i]);
    for (i = 0; i < 9; ++i)
        for (j = i + 1; j < 10; ++j)
            if (v[i] > v[j]) {
                temp = v[i];
                v[i] = v[j];
                v[j] = temp;
            }
    printf("Ordenado: ");
    for (i = 0; i < 10; ++i)
        printf("%d ", v[i]);
    printf("\n");
    return 0;
}