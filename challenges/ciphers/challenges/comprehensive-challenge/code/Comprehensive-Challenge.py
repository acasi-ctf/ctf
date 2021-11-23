import random

flag = "\u0043\u0041\u0045\u0053\u002d\u0052\u0045\u0053\u0056\u002d\u004e\u0055\u004d\u0042\u002d\u0043\u0048\u0041\u004c"

def random_alphabet():

    string = ""
    for i in range(3):
        for j in range(4):
            string = string + random.choice('ABCDEFGHIJKLMNOPQRSTUVWXYZ')
        if (i < 2):
            string = string + " "
    return string

def Caesar(flag):

    lists = list(flag[:])
    new_list = []

    for i in lists: 
        if i.isalpha():
            if 65 <= ord(i) <= (90-4):
                new_list.append(chr(ord(i) + 4)) 
            else:
                new_list.append(chr(ord(i) - (26-4)))    
        else:
            new_list.append(i)
            
    after = "".join(new_list)

    return after

def Reverse(c_flag):
    
    reverse = ''
    i = len(c_flag) - 1
    
    while i>=0:
        
        reverse = reverse + c_flag[i]
        i = i - 1

    return reverse

def Convert_number(r_flag):
    
    lists = list(r_flag[:])
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



if __name__ == "__main__":

    print("This is a mixed classical cipher challenge!")

    f = random_alphabet()
    
    c_flag = Caesar(f)
    r_flag = Reverse(c_flag)
    number_flag = Convert_number(r_flag)

    print("")

    print("Level - 1")
    print("Numbers and alphabetic characters have an inherent relation.")
    print("The first ciphered text is: " + number_flag)

    ans1 = 0
    while(ans1 == 0):
        strs = input("The decoded text is: ")
        if strs == r_flag:
            ans1 = 1
        else:
            print("Nope! (Hint - 1 = A)")
            continue

    print(" ")
    print("Level - 2")
    print("Find the link between the numbers and letters!")
    print("A little hint before you start: GALF = FLAG")
    print("Let's move to the next step:")
    print(r_flag)


    ans2 = 0
    while(ans2 == 0):
        strs = input("The deciphered text is: ")
        if strs == c_flag:
            ans2 = 1
        else:
            print("Nope!(Hint - Think backwards!)")
            continue

    print(" ")
    print("Level - 3")
    print("Looks like you need a hint - \"Think backwards\"!")
    print("Let's move to final step")
    print("Before you do it, here is a hint: Jepk = Flag")
    print(c_flag)


    ans3 = 0
    while(ans3 == 0):
        strs = input("The deciphered text is: ")
        if strs == f:
            ans3 = 1
        else:
            print("Nope! Try again!")
            continue
        
    print(" ")
    print("Congratulations! The flag is:")
    print(flag)
