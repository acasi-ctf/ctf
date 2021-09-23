# One-Time Pad (OTP)
OTP was discovered by Frank Miller in 1882 and is still used today. OTP is usually use for login verification code. It uses random key to encipher the plain message, so it is hard for other people to decipher it. However, there are other cipher method discovered by other people, so it means OTP is not perfect. For enciphering, the key must have at least same length as the plain text. The next step is converted plain text and key to number set, add same index number together then mod 26 to get cipher text.

## Example:
A – Z = 0 – 25
(b + a) mod 26 => 0+1 mod 26 => 1 => b
Plain-text: This is an example -> 19 7 8 18 8 18 0 13 4 23 0 12 15 11 4
Key: This is an example -> 19 7 8 18 8 18 0 13 4 23 0 12 15 11 4
Cipher-text: Moqk qk aa iuayewi -> 12 14 16 10 16 10 0 0 8 20 0 24 4 22 8
