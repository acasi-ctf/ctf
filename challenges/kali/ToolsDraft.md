# Planned Linux/Kali Commands to Demonstrate

**Steganography:**

- strings – Displays readable text characters.
  - Requires: Executable with hidden text. Linux.
- binwalk – Extract hidden files and executables from bins.
  - Requires: Bin File with embedded program. Linux.
- Steghide – is able to hide data in various kinds of image- and audio-files. (Maybe)
- pngcheck – look for/correct broken chunks in PNGs. (Maybe)
  - Requires: PNG file with message encoded.

**Crytography:**

- TBD

**Password Cracking:**

- Hash-Identifier – Identifies hash types, used to decide how to approach breaking a hash.
  - Requires: A hashed password, kali env.
- Hashcat – HASH cracking tool
  - Requires: A hashed password, kali env.
- John the Ripper – Detect and crack weak PWs.
  - Requires: Hashed Password. Kali env.
- txt WordList – Dictionary Wordlist.

**Web:**

- DIRB – brute force, looks for existing (and/or hidden) Web Objects
  - Requires: Website with multiple hidden directories.

**Scanning:**

- Nmap – utility for network discovery and auditing
  - Requires: If possible would need to build up some sort of network to demonstrate nmap.
- Metasploit Framework – scan for known vulnerabilities (Kali)
  - Requires: Vulnerable system.
- Recon-ng – Recon (Kali).
  - Requires:

**Network Traffic Analysis:**

- Wireshark – Network Traffic capture and analysis.
  - Requires: Packet Route where we can simulate a packet transfer.
- tcpdump – Packet analyzer
  - Requires: Captured Packet.
- ngrep – search for strings in network packets
  - Captured Pack

**Enumeration and Exploitation:**

- &#39;File&#39; Command – determine a file type (including executables)
- Hex Editor – view executable for visible text stings
- &#39;xxd -r&#39; Command – convert a hex dump back to its original binary form
- Ghidra – reverse engineering tool developed by the NSA (Maybe)
- Objdump -d – Linux command line dis-assembler
- Netcat – utility that reads and writes data across network
- uncompyle6 – translates Python bytecode back into source
- Pwntools – a CTF framework and exploit development library.

**Wireless Exploitation:**

Not sure if these are going to be possible simulate, I had a good experience messing with Aircrack so thought it should be mentioned in case.

- Aircrack- ng – tools to assess WiFi network security
- &#39;ifconfig&#39; command – configure and query TCP/IP network interface parameters