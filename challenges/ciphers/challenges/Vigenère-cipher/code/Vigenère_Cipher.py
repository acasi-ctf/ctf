#Vigenere Cipher

import random

#Create a random string for plain text
def RandomString():

    string = ""
    for i in range(10):
        string = string + random.choice('abcdefghijklmnopqrstuvwxyz')
    return string

#Create a random string for secret-key
def RandomKey():

    key = ""
    for i in range(4):
        key = key + random.choice('abcdefghijklmnopqrstuvwxyz')
        
    return key

#Encrypt method
def Encrypt(message,key):

    #conver the key to number 
    temp = []
    for i in key:
        temp.append(ord(i) - 97)

    #encrypt the plain text
    letter_list = "abcdefghijklmnopqrstuvwxyz"
    ciphertext = ""
    index = 0

    for i in message:
        if index % 4 == 0:
            index = 0

        ciphertext += letter_list[(ord(i) - 97 + temp[index]) % 26]
        index += 1

    return ciphertext

#Main methid for running the program
def main():
    string = RandomString()
    key = RandomKey()

    result = Encrypt(string,key)

    print("The cypher text is \"" + result + "\"")
    print("The seret-key is \"" + key + "\"")

    while(True):
        strs = input("The decode text is: ")
        if strs == string:
            break
        else:
            print("Nope! Try Again!")
            continue

    print("Congrarulation! You get the points!")
    
    
if __name__ == "__main__":
    main()
