# Dockerfile - binwalk Tutorial
FROM ghcr.io/acasi-ctf/ctf/penimage:latest

WORKDIR /home/player

#Copy password1-4 files. Using wild card to avoid multiple lines.
COPY challenges/kali/challenges/hashcat/src/hashed-password .

# Install hash-identifier, hashcat and wordlist. Copy rockyou.txt.gz into current directory and unzip.
RUN apt-get update && \
  apt-get install hash-identifier && \
  apt-get install hashcat && \
  apt-get install wordlists && \
  cp /usr/share/wordlists/rockyou.txt.gz . &&\
  gunzip rockyou.txt.gz &&\
  apt-get clean all && \
  rm -rf /var/lib/apt/lists/*

