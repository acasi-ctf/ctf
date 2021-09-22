#RSA Encryption and Decryption
import random

def RandomNumber():
    number = random.randint(2,99)
    return number

#encrypt the massage
def Encrypt(number, n, e):

    cipher = pow(number,e) % n
    
    return cipher

#Decrypt the massage
def Decrypt(number, n, e):

    massage = pow(number,e) % n
    
    return massage

def main():

    numberOne = RandomNumber()
    print("Now we need to encrypt a massage with public key (781,31)")
    print("This is the massage: " + str(numberOne))
    encryptTextOne = Encrypt(numberOne, 781, 31)

    numberTwo = RandomNumber()
    encryptTextTwo = Encrypt(numberTwo, 781, 31)  
    #decryptText = Decrypt(encryptText, 781, 271)

    print(encryptTextOne)
    print(numberTwo)

    while(True):
        answer = input("Enter Your Answer: ")
        if answer.isdigit():
            if int(answer) == encryptTextOne:
                print("You got it. Move to next step.")
                break
            else:
                print("Sorry, wrong answer.")
    
    print("Now we need to decrypt a massage with private key (781,271)")
    print("This is the massage: " + str(encryptTextTwo))
    while(True):
        answer = input("Enter Your Answer: ")
        if answer.isdigit():
            if int(answer) == numberTwo:
                break
            else:
                print("Sorry, wrong answer.")

    print("Congratulation!")

if __name__ == "__main__":
    main()
