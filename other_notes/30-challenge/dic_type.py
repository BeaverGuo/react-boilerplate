#!/bin/python3

import sys

# entries in the phone book
n = int(input().strip())
dic = {}
for i in range(n):
    user_input_arr = input().strip().split(' ')
    dic[user_input_arr[0]] = user_input_arr[1]


while True:
    user_query = input().strip()
    if(user_query in dic):
        print(user_query, ' = ', dic[user_query])
    else:
        print('Not found')



