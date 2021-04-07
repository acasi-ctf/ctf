# Caesar cipher
The Caesar cipher is one of the simplest and most widely known encryption techniques.

Caesar cipher is a replacement encryption technique in which all letters in plaintext
are offset backwards or forwards in the alphabet by a fixed number and replaced with ciphertext.
People still using ROT13 now a days which means move the letter forwards with 13 steps.
Example is using N to replace A, O to replace B.

## Example
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