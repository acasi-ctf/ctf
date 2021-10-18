**Planned Linux/Kali Commands to Demonstrate**

**Steganography:**

Good entry commands, and a common stable of CTFs. Requires corresponding files with hidden
keys/flags.

- strings – Displays readable text characters.
- binwalk – Extract hidden files and executables from bins.
- Steghide – is able to hide data in various kinds of image- and audio-files. (Maybe)
- pngcheck – look for/correct broken chunks in PNGs.

**Cryptography:**

The majority of useful tools I found were websites rather than in cli tools. Potentially something to
explore.

- TBD

**Password Cracking:**

Basic brute forcing, dictionary attacks etc. Requires hashed passwords, Kali Linux brute force
frameworks.

- Hash-Identifier – Identifies hash types, used to decide how to approach breaking a hash.
- Hashcat – HASH cracking tool
- John the Ripper – Brute force tool.
- Rockyou.txt WordList – Dictionary Wordlist.

**Web:**

Website structure analysis. Requires website with generic structure and a hidden flag.

- DIRB – brute force, looks for existing (and/or hidden) Web Objects

**Scanning:**

Networking observation and mapping. Requires at the very least, two VMs and possibly a router. The
closer we can simulate a corporate network the better.

- Nmap – Network reconnaissance, network inventory
- Recon-ng – Web Reconnaissance tool.
- Metasploit Framework – Known vulnerabilities, prebuilt frameworks.

**Network Traffic Analysis:**

Requires a generic understanding of how information is distributed. While I could accomplish quite a bit
without actually needing a network, I think it'll be best to setup a network behind our user vm.

- ngrep – Search for strings in network packets


- Wireshark – Network Traffic capture and analysis.
- tcpdump – Packet analyzer
- Netcat – Utility that reads and writes data across network

**Forensics**

Reverse engineering, code diagnosis. Requires executables Kali Linux environment.

- Ghidra – Reverse engineering tool developed by the NSA (Maybe)
- Objdump -d – Linux command line dis-assembler
- uncompyle6 – Translates Python bytecode back into source
- Pwntools – A CTF framework and exploit development library. (Maybe)

**Wireless Exploitation:**

Likely not achievable in our current environment. Would require a simulated wireless network.

- Aircrack-ng – Wireless network penetration testing and surveillance. (Maybe)


