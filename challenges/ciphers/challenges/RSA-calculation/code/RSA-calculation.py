#RSA-leaning calculation
import random
import math

#get two prime number
def RandomNumber():

    #create a list that has all the prime number between 1 - 200
    primeList = []    
    for n in range(1, 200):
        isPrime = True

        for num in range(2, n):
            if n % num == 0:
                isPrime = False

        if isPrime:
            primeList.append(n)
            
    n = random.sample(primeList,2)
    primeOne = n[0]
    primeTwo = n[1]

    return primeOne, primeTwo
    
#the main method
def main():
    
    #p, q = RandomNumber()
    p = 11
    q = 3
    print("You have two prime numbers")
    print("The p is: " + str(p))
    print("The q is: " + str(q))

    #get the value of N
    while(True):
        N = input("Please Enter the value of N: ")
        if N.isdigit():
            if int(N) == p * q:
                break
            else:
                print("The value is not correct.")
            
    #get the value of r
    while(True):
        r = input("Please Enter the value of r: ")
        if r.isdigit():
            if int(r) == (q-1) * (p-1):
                break
            else:
                print("The value is not correct.")

    #get the value of e
    while(True):
        e = input("Please select a integer e which smaller than r: ")
        if e.isdigit():
            if int(e) < int(r):
                result = math.gcd(int(e),int(r))
                if result == 1:
                    break
                else:
                    print("The e and r need to be prime numbers to each other.")
                    continue
            else:
                print("e must smaller than r.")

    #get the final d
    while(True):
        d = input("Please enter the value of d: ")
        if d.isdigit():
            if int(d) == round((int(r) + 1) / int(e)):
                break
            else:
                print("You get the wrong answer.")

    #enter the public key and private key
    while(True):
        publicKey = input("Please enter the public key: ")
        p_k = "(" + N + "," + e +")"
        if publicKey == p_k:
            break
        else:
            print("You get the wrong public key.")

    while(True):
        privateKey = input("Please enter the private key: ")
        r_k = "(" + N + "," + d +")"
        if privateKey == r_k:
            break
        else:
            print("You get the wrong private key.")

    print("Congratulation!")

if __name__ == "__main__":
    main()
