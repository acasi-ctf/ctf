import random
import base64

#random string
def random_alphabet():

    string = ""
    for i in range(10):
        string = string + random.choice('ABCDEFGHIJKLMNOPQRSTUVWXYZ')
    return string

#convert letter to number
def Convert_number(string):
    
    lists = list(string[:])
    new_list = []
 
    for i in lists: 
        if i.isalpha(): 
            if 97 <= ord(i) < (122-4):
                new_list.append(ord(i) - 96)
            else:
                new_list.append(ord(i) - 64)
        else:
            new_list.append(i)
            
    after = "".join((str(v)+" ") for v in new_list)
    
    return after

def convert():
    s = "JZKU2QRNIVJDAMRNJRCVIVBNIVJDAMQ="
    b32 = base64.b32decode(s)
    output = str(b32)
    output = output[2:21]
    print(output)

def main():
    
    string = random_alphabet()
    code = Convert_number(string)
    print("This is a letter to number challenge!")
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
