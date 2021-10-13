# Caesar cipher
The Caesar cipher is one of the simplest and most widely known encryption techniques.

Caesar ciphers are a replacement encryption technique in which all letters in plaintext
are offset by a fixed number and replaced with ciphertext.
An example cipher that is still commonly used today would be ROT13. This means that your ciphered letter is 13 positions after
the unciphered character in the alphabet. If you reach the end of the alphabet you start back at A and continue.

Example is using N to replace A, O to replace B.

## Examples
We set positive n for steps that we move letter forwards or negetive n for backwards.
If n = 3, we will have:
ABCDEFGHIJKLMNOPQRSTUVWXYZ
DEFGHIJKLMNOPQRSTUVWXYZABC

Code = "KHOOR"
Decode = "HELLO"

If n = -2, we will have:
ABCDEFGHIJKLMNOPQRSTUVWXYZ
YZABCDEFGHIJKLMNOPQRSTUVWX

Code = "AGNFCP"
Decode = "CIPHER"
