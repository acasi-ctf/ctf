# Rivest-Shamir-Adleman (RSA)
RSA encryption algorithm is an asymmetric encryption algorithm, widely used in public key encryption and electronic commerce. During using the RSA, it will have message, ciphertext, public key, and private key. For create the public key and private key, it needs to multiply two prime number to get N. Using Euler’s totient function to get r. Basic on r, we will get a Integer which is less than r, and calculate d which is modular multiplicative inverse by e and r. The public key is (N,e), and the private key is (N,d).

## Example:
p and q are prime numbers.
N = p * q.
r = (p-1) * (q-1).
e can be any integer which less than r. Also, the e and r are prime numbers to each other.
ed ≡ 1 (mod r).
public key = (N,e)
private key = (N,d)