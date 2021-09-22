## Rivest-Shamir-Adleman (RSA)
RSA encryption algorithm is an asymmetric encryption algorithm, widely used in public key encryption and electronic commerce. During using the RSA, it will have message, ciphertext, public key, and private key. For create the public key and private key, it needs to multiply two prime number to get N. Using Euler’s totient function to get r. Basic on r, we will get an Integer which is less than r, and calculate d which is modular multiplicative inverse by e and r. The public key is (N,e), and the private key is (N,d).
RSA can use for any kind of massage to encrypt, such as integer, string, picture, and video.　For example, the program will extract the information, such as the whole massage. Using the public key and private key that we calculated to encipher and decipher. If we want to increase the, we can increase the bit of the key. The calculation of encipher will be cipher = massage^e mod n. The decipher will be massage = cipher^d mod n.

## Example:
p and q are prime numbers.
N = p * q.
r = (p-1) * (q-1).
e can be any integer which less than r. Also, the e and r are prime numbers to each other.
ed ≡ 1 (mod r).
cipher = massage^e mod n
massage = cipher^d mod n