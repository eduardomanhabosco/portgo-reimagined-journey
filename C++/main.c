#include <locale.h>
int main(int argc,char const *argv[]) {
    setlocale(LC_ALL, "Portuguese");
  printf("Olá Mundo");
    return 0;
}