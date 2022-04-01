from  random import randint
import base64

#start_game
def main():

    print("\nWelcome to Maths Practice")
    print("Practice your addition, substratcion, and multiplication skills.")
    print("Which would you like to do?")
    print("A :  Addition")
    print("B :  Subtraction")
    print("C :  Multiplication")
    print("D :  Exit Game\n")

    choice = input("> ")

    if choice =="A":
        addition()
    elif choice == "B":
        subtraction() 
    elif choice == "C":
        multiplication()
    elif choice == "D":
        return None
    else:
        print("That's not one of the choices! Try again. \n")
        main()

def convert():
    s ="TUFUSC1TUENILUFMTEUtTkdFMQ=="
    b = s.encode("ascii")
    b64 = base64.b64decode(b)
    output = b64.decode("ascii")
    print(output)

#Encode
def subtraction():
    num_1 = randint(0,9)
    num_2 = randint(0,9)
    print("What is "+str(num_1)+" - "+ str(num_2)+" ? \n")
    choice = input("> ")
    if int(choice) == num_1-num_2:
        print("Correct! Nice job! Keep on playing!\n")
        print()
        print("Congratulations! The flag is:")
        convert()
        #start_game()
    else:
        print("Incorrect...the answer is "+str(num_1-num_2)+" !\n")
        main()

def addition():
    num_1 = randint(0,9)
    num_2 = randint(0,9)
    print("What is "+str(num_1)+"+"+ str(num_2)+" ? \n")
    choice = input("> ")
    if int(choice) == num_1 + num_2:
        print("Correct! Nice job! Keep on playing!\n")
        #start_game()
        print()
        print("Congratulations! The flag is:")
        convert()
    else:
        print("Incorrect...the answer is "+str(num_1+num_2)+" !\n")
        main()

def multiplication():
    num_1 = randint(0,9)
    num_2 = randint(0,9)
    print("What is "+str(num_1)+" x "+ str(num_2)+" ? \n")
    choice = input("> ")
    if int(choice) == num_1*num_2:
        print("Correct! Nice job! Keep on playing!\n")
        #start_game()
        print()
        print("Congratulations! The flag is:")
        convert()
    else:
        print("Incorrect...the answer is "+str(num_1*num_2)+" !\n")
        main()
if __name__ == "__main__":
    main()

