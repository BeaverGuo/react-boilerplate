input_number = int(input(''))
input_buffer = []
for j in range(input_number):
    input_buffer.append(input(''))
 
def printWord(s):
    s_array = list(s)
    even_s = ''
    odd_s = ''
    for i in range(len(s_array)):
        if i % 2 == 0:
            even_s += str(s_array[i])
        else:
            odd_s += str(s_array[i])
    print(even_s, odd_s)

for k in range(len(input_buffer)):
    printWord(input_buffer[k])