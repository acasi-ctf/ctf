#OTP
import random

#provide a randon string to user to encipher
def randonString(messgae):
    
    string = ""
    for i in messgae:
        if i.isupper():
            string = string + random.choice('ABCDEFGHIJKLMNOPQRSTUVWXYZ')
        if i.islower():
            string = string + random.choice('abcdefghijklmnopqrstuvwxyz')
    return string

#encipher function
def Encipher(message, key):

    temp = []
    for i in key:
        if i.isupper():
            temp.append(ord(i) - 65)
        if i.islower():
            temp.append(ord(i) - 97)
        

    #encrypt the plain text
    letter_list_one = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    letter_list_two = "abcdefghijklmnopqrstuvwxyz"
    ciphertext = ""
    index = 0

    for i in message:
        if i.isupper():
            ciphertext += letter_list_one[(ord(i) - 65 + temp[index]) % 26]
            index += 1;
        if i.islower():
            ciphertext += letter_list_two[(ord(i) - 97 + temp[index]) % 26]
            index += 1;
    return ciphertext

def main():

    print("OTP")
    while(True):
        message = input("Please enter at less 8 letters' string: ")
        message = message.replace(" ","")
        if len(message) >= 8 and message.isalpha():
            break
        else:
            print("Please Enter a value string.")

    key = randonString(message)

    print("This is the key for you to enciper your message: " + key)

    result = Encipher(message, key)
    
    while(True):
        userInput = input("Please Enter your ciphertext(No Space): ")
        if userInput == result:
            print("Congrarulation!")
            break
        else:
            print("Nope! Try again!")

if __name__ == "__main__":
    main()
