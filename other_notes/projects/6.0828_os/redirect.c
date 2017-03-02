#include <stdio.h>

#define BUFSIZE 128

char buf[BUFSIZE];


int main(void) {
  int n = read(0, buf, BUFSIZE);
  close(1);
  int fd = creat("output.txt", 0666);
  fprintf(stderr, "fd = %d\n", fd);
  write (fd, buf, n);
}
