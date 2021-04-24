import random

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
            print("Nope... Try Again!")
            continue

    print("Congratulations! You get 10 points!")
    

if __name__ == "__main__":
    main()
