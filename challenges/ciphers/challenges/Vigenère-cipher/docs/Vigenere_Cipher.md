# Vigenere Cipher
Vigenère cipher is one of the classical ciphers. This is a variant of Caesar encryption. It is easy to use and hard to break at the past. From its history, people take three hundred years to break it. Before encrypting, it needs a secret-key for processing the encrypting. The process is the repeated the secret-key until it as long as the plain text’s length and change them to numbers. Each plaintext letter adds same index’s number to convert to new letter.

## Example
We have a plain text "I LOVE CiPHER".
We have a secret-key "HI".
For the first step, we need to make a string which has same length as plain text and basic with "HI".
"I LOVE CIPHER"
"H IHIH IHIHIH"

For the second step, we need to change the secret-key to number. From A-Z, it is 0-25.
"HIHIHIHIHIH" => "7 8787 878787"

For the last step, add each plain text' letter with same index's number to get new letter.
I + 7 = 8 + 7 = 15 = P
"I LOVE CIPHER" Plain text
"7 8787 878787" Secret-key
"P TVDL KPXOMY" Cypher text