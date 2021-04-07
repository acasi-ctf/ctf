import random

#Random String
def random_alphabet():

    string = ""
    for i in range(10):
        string = string + random.choice('ABCDEFGHIJKLMNOPQRSTUVWXYZ')
    return string

#Encode
def Caesar(flag,number):

    lists = list(flag[:])
    new_list = []

    for i in lists: 
        if i.isalpha():
            
            if 65 <= ord(i) <= (90-number):
                new_list.append(chr(ord(i) + number))
            
            else:
                new_list.append(chr(ord(i) - (26-number)))
                
        else:
            new_list.append(i)
            
    after = "".join(new_list)

    return after

def main():

    number = random.randint(1,10)
    string = random_alphabet()
    code = Caesar(string,number)
    hint = Caesar("FLAG",number)
    print("This is Caesar cipher Challenge!")
    print("Hint for this challenge is:")
    print(hint + " = \"FLAG\"")
    print("The code is:")
    print(code)
    print()

    while(True):
        strs = input("The decode text is: ")
        if strs == string:
            break
        else:
            print("Nope!Try Again!")
            continue

    print("Congrarulations! You get 10 point!")

if __name__ == "__main__":
    main()
