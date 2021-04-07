
#the flag
flag = "YOU GOT THE FLAG"

#CSY KSX XLI JPEK
#KEPJ ILX XSK YSC
#11 5 16 10   9 12 24   24 19 11   25 19 3

def Caesar(flag):

    lists = list(flag[:])
    new_list = []

    for i in lists: 
        if i.isalpha():
            
            if 97 <= ord(i) < (122-4) or 65 <= ord(i) < (90-4):
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
    
    print("This is Classical Cipher mixed Challenge!")
    
    c_flag = Caesar(flag)
    r_flag = Reverse(c_flag)
    number_flag = Convert_number(r_flag)

    print("")

    print("Number and Alphabat have their own connection.")
    print("The first code is: " + number_flag)

    ans1 = 0
    while(ans1 == 0):
        strs = input("The decode is: ")
        if strs == r_flag:
            ans1 = 1
        else:
            print("Nope!")
            continue

    print(" ")
    print("You find out the connection between number and letter!")
    print("The little hint before you do it is GALF = FLAG")
    print("Let's move to next step:")
    print(r_flag)


    ans2 = 0
    while(ans2 == 0):
        strs = input("The decode is: ")
        if strs == c_flag:
            ans2 = 1
        else:
            print("Nope!(Hint-Think backwards!)")
            continue

    print(" ")
    print("Looks like you got the hint - \"Think backwards\"!")
    print("Let's move to fininal step")
    print("Before you do it, there is a hint Jepk = Flag")
    print(c_flag)


    ans3 = 0
    while(ans3 == 0):
        strs = input("The decode is: ")
        if strs == flag:
            ans3 = 1
        else:
            print("Nope!")
            continue
        
    print(" ")
    print("Congrarulations! You get 100 point!")
