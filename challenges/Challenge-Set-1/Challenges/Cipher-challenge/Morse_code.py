import random

#dictionary for encode
code = {'A':'.-'  ,'B':'-...','C':'-.-.','D':'-..','E':'.',
        'F':'..-.','G':'--.' ,'H':'....','I':'..'  ,'J':'.---',
        'K':'-.-' ,'L':'.-..','M':'--'  ,'N':'-.'  ,'O':'---',
        'P':'.--.','Q':'--.-','R':'.-.' ,'S':'...' ,'T':'-',
        'U':'..-' ,'V':'...-','W':'.--' ,'X':'-..-','Y':'-.--',
        'Z':'--..'}

#dictionary for decode
code2 = dict(zip(code.values(),code.keys()))

#create a random string with 10 letter
def random_alphabet():

    string = ""
    for i in range(10):
        string = string + random.choice('ABCDEFGHIJKLMNOPQRSTUVWXYZ')
    return string

def encode(string):

    for letter in string:
        print(code[letter], end=' ')
    print()
    
def main():    

    string = random_alphabet()
    print("This is a Morse Code challenge!")
    print("Use the table to decipher the tex.")
    print("The code is:")
    encode(string)
    print()

    while(True):
        strs = input("The deciphered text is: ")
        if strs == string:
            break
        else:
            print("Nope... Try Again!")
            continue

    print("Congratulations! You get 10 points!")
        

if __name__=="__main__":
    main()
