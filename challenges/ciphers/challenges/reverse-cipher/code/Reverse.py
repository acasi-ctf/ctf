import random
import base64

#random string
def random_alphabet():

    string = ""
    for i in range(10):
        string = string + random.choice('ABCDEFGHIJKLMNOPQRSTUVWXYZ')
    return string

#reverse the string
def Reverse(string):
    
    reverse = ''
    i = len(string) - 1
    
    while i>=0:
        
        reverse = reverse + string[i]
        i = i - 1

    return reverse

def convert():

    s = b'QbkrpEmBiOMJ+`|Q&KHORz*?'
    b85 = base64.b85decode(s)
    output = str(b85)
    output = output[2:21]
    print(output)
    

def main():

    string = random_alphabet()
    code = Reverse(string)
    print("This is a reverse text challenge!")
    print("The code is:")
    print(code)
    print()

    while(True):
        strs = input("The deciphered text is: ")
        if strs == string:
            break
        else:
            print("Nope! Try Again!")
            continue

    print("Congratulations! The flag is:")
    convert()
    

if __name__ == "__main__":
    main()
