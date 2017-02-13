//base36 转换的C语言实现
static char *base36enc(long unsigned int value)
{
    char base36[36] = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    /* log(2**64) / log(36) = 12.38 => max 13 char + '\0' */
    char buffer[14];
    unsigned int offset = sizeof(buffer);

    buffer[--offset] = '\0';
    do {
        buffer[--offset] = base36[value % 36];
    } while (value /= 36);

    return strdup(&buffer[offset]); // warning: this must be free-d by the user
}

static long unsigned int base36dec(const char *text)
{
    return strtoul(text, NULL, 36);
}