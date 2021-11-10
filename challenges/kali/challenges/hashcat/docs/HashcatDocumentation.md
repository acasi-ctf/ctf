# Linux Tools

## -hashcat

The tool _hashcat_ is a tool intended to assist its user in cracking encrypted password through various methods. It allows users to easily automate attacks against passwords using brute-force, dictionary attacks and rainbow tables. _hashcat_ supports most common encryption methods and its various attack techniques make it a powerful tool in password decrypting. To view all options _hashcat_ offers, we can run the command with a -h or -help option:

```Bash
root: $ hashcat -h
```
The most important options to define are the hash-type or method of encryption you are trying to break and the attack mode we want to utilize. 

```Bash
 Options Short / Long           | Type | Description                                          | Example
================================+======+======================================================+=======================
 -m, --hash-type                | Num  | Hash-type, see references below                      | -m 1000
 -a, --attack-mode              | Num  | Attack-mode, see references below                    | -a 3
```

In order to decide what hash-type we are using we will utilize _hash-identifier_ to determine the encryption method of our hashed password. Below we have a file password which contains a hashed password:

```Bash
root: $ cat password                                                             
482c811da5d5b4bc6d497ffa98491e38

root: $ hash-identifier
   #########################################################################
   #     __  __                     __           ______    _____           #
   #    /\ \/\ \                   /\ \         /\__  _\  /\  _ `\         #
   #    \ \ \_\ \     __      ____ \ \ \___     \/_/\ \/  \ \ \/\ \        #
   #     \ \  _  \  /'__`\   / ,__\ \ \  _ `\      \ \ \   \ \ \ \ \       #
   #      \ \ \ \ \/\ \_\ \_/\__, `\ \ \ \ \ \      \_\ \__ \ \ \_\ \      #
   #       \ \_\ \_\ \___ \_\/\____/  \ \_\ \_\     /\_____\ \ \____/      #
   #        \/_/\/_/\/__/\/_/\/___/    \/_/\/_/     \/_____/  \/___/  v1.2 #
   #                                                             By Zion3R #
   #                                                    www.Blackploit.com #
   #                                                   Root@Blackploit.com #
   #########################################################################
--------------------------------------------------
 HASH: 482c811da5d5b4bc6d497ffa98491e38

Possible Hashs:
[+] MD5
[+] Domain Cached Credentials - MD4(MD4(($pass)).(strtolower($username)))

Least Possible Hashs:
[+] RAdmin v2.x
[+] NTLM
[+] MD4
[+] MD2
[+] MD5(HMAC)
[+] MD4(HMAC)
[+] MD2(HMAC)
[+] MD5(HMAC(Wordpress))
[+] Haval-128
[+] Haval-128(HMAC)
[+] RipeMD-128
[+] RipeMD-128(HMAC)
[+] SNEFRU-128
[+] SNEFRU-128(HMAC)
[+] Tiger-128
[+] Tiger-128(HMAC)
[+] md5($pass.$salt)
[+] md5($salt.$pass)
[+] md5($salt.$pass.$salt)
[+] md5($salt.$pass.$username)
[+] md5($salt.md5($pass))
[+] md5($salt.md5($pass))
[+] md5($salt.md5($pass.$salt))
[+] md5($salt.md5($pass.$salt))
[+] md5($salt.md5($salt.$pass))
[+] md5($salt.md5(md5($pass).$salt))
[+] md5($username.0.$pass)
[+] md5($username.LF.$pass)
[+] md5($username.md5($pass).$salt)
[+] md5(md5($pass))
[+] md5(md5($pass).$salt)
[+] md5(md5($pass).md5($salt))
[+] md5(md5($salt).$pass)
[+] md5(md5($salt).md5($pass))
[+] md5(md5($username.$pass).$salt)
[+] md5(md5(md5($pass)))
[+] md5(md5(md5(md5($pass))))
[+] md5(md5(md5(md5(md5($pass)))))
[+] md5(sha1($pass))
[+] md5(sha1(md5($pass)))
[+] md5(sha1(md5(sha1($pass))))
[+] md5(strtoupper(md5($pass))) 
```

With the password determined to be using MD5 encryption we can specify our hash-type to MD5. Call _hashcat -h_ we can scroll down to determine the integer value correlating to MD5:

```Bash
root: $ hashcat -h

- [ Hash modes ] -

      # | Name                                             | Category
  ======+==================================================+======================================
    900 | MD4                                              | Raw Hash
      0 | MD5                                              | Raw Hash
    100 | SHA1                                             | Raw Hash
   1300 | SHA2-224                                         | Raw Hash
   1400 | SHA2-256                                         | Raw Hash
  10800 | SHA2-384                                         | Raw Hash
   1700 | SHA2-512                                         | Raw Hash
  17300 | SHA3-224                                         | Raw Hash
  17400 | SHA3-256                                         | Raw Hash
  17500 | SHA3-384                                         | Raw Hash
  17600 | SHA3-512                                         | Raw Hash
       ...
```

Next we need to specify the type of attack we want to conduct. While each method has its advantages and disadvantages, a good starting point to conduct a straightforward dictionary attack, so we will perform a Straight attack mode.

```Bash
root: $ hashcat -h

- [ Attack Modes ] -

  # | Mode
 ===+======
  0 | Straight
  1 | Combination
  3 | Brute-force
  6 | Hybrid Wordlist + Mask
  7 | Hybrid Mask + Wordlist
```

In order to perform a dictionary attack we need to acquire a dictionary wordlist, Kali Linux comes with built in wordlists, one of the most commonly used is the rockyou.txt which contains thousands of commonly used passwords.

Finally, to run the _hashcat_ tool we will specify our hash-type and attack method we determined previously. Additionally, we will specify our _password_ file with the hashed password and the _rockyou.txt_ dictionary. 

```Bash
root: $ hashcat -m 0 -a 0 -o password rockyou.txt

hashcat (v6.1.1) starting...

OpenCL API (OpenCL 2.0 pocl 1.8  Linux, None+Asserts, RELOC, LLVM 9.0.1, SLEEF, DISTRO, POCL_DEBUG) - Platform #1 [The pocl project]
====================================================================================================================================
* Device #1: pthread-Intel(R) Core(TM) i7-10700K CPU @ 3.80GHz, 23484/23548 MB (8192 MB allocatable), 16MCU

Minimum password length supported by kernel: 0
Maximum password length supported by kernel: 256

Hashes: 1 digests; 1 unique digests, 1 unique salts
Bitmaps: 16 bits, 65536 entries, 0x0000ffff mask, 262144 bytes, 5/13 rotates
Rules: 1

Applicable optimizers applied:
* Zero-Byte
* Early-Skip
* Not-Salted
* Not-Iterated
* Single-Hash
* Single-Salt
* Raw-Hash

ATTENTION! Pure (unoptimized) backend kernels selected.
Using pure kernels enables cracking longer passwords but for the price of drastically reduced performance.
If you want to switch to optimized backend kernels, append -O to your commandline.
See the above message to find out about the exact limits.

Watchdog: Hardware monitoring interface not found on your system.
Watchdog: Temperature abort trigger disabled.

Host memory required for this attack: 68 MB

Dictionary cache hit:
* Filename..: rockyou.txt
* Passwords.: 14344385
* Bytes.....: 139921507
* Keyspace..: 14344385

482c811da5d5b4bc6d497ffa98491e38:password123

Session..........: hashcat
Status...........: Cracked
Hash.Name........: MD5
Hash.Target......: 482c811da5d5b4bc6d497ffa98491e38
Time.Started.....: Wed Nov 10 00:20:31 2021 (0 secs)
Time.Estimated...: Wed Nov 10 00:20:31 2021 (0 secs)
Guess.Base.......: File (rockyou.txt)
Guess.Queue......: 1/1 (100.00%)
Speed.#1.........:  6969.8 kH/s (0.27ms) @ Accel:1024 Loops:1 Thr:1 Vec:8
Recovered........: 1/1 (100.00%) Digests
Progress.........: 16384/14344385 (0.11%)
Rejected.........: 0/16384 (0.00%)
Restore.Point....: 0/14344385 (0.00%)
Restore.Sub.#1...: Salt:0 Amplifier:0-1 Iteration:0-1
Candidates.#1....: 123456 -> cocoliso

Started: Wed Nov 10 00:20:31 2021
Stopped: Wed Nov 10 00:20:33 2021
```

From the output we can tell that the tool cracked the hash and can see the original hashed password and the decrypted plain text password:

```Bash
482c811da5d5b4bc6d497ffa98491e38:password123
```

**To Do:** Use _hash-identifier_ and _hashcat_ to decrypt this hashed password to discover the flag: C9EC0E93091988EB84453286C975532F8762606B7B893195F3ECFF0E064AAE87

Additional Documentation: [Hashcat - Kali Tools](https://www.kali.org/tools/hashcat/)
                          [Hash-Identifier - Kali Tools](https://www.kali.org/tools/hash-identifier/)
                          [Wordlists - Kali Tools](https://www.kali.org/tools/wordlists/)