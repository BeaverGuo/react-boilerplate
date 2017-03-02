#include <unistd.h>

#define BUFSIZE 128

char buf[BUFSIZE];

int main(void) {
  int n = read(0, buf, BUFSIZE);
  write (1, buf, n);
}
