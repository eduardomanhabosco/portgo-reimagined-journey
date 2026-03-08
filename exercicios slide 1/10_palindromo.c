#include <stdio.h>
#include <locale.h>
#include <stdlib.h>
#include <string.h>
int main() {
      system("chcp 65001 > nul"); 
    setlocale(LC_ALL, ".UTF8");
    char str[100];
    int i, len, palindromo = 1;
    printf("Digite uma string: ");
    scanf("%s", str);
    len = strlen(str);
    for (i = 0; i < len / 2; ++i) {
        if (str[i] != str[len - 1 - i]) {
            palindromo = 0;
            break;
        }
    }
    if (palindromo)
        printf("É palíndromo\n");
    else
        printf("Não é palíndromo\n");
    return 0;
}