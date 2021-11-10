# Dockerfile - binwalk Tutorial
FROM ghcr.io/acasi-ctf/ctf/penimage:latest

WORKDIR /home/player

#Copy password1-4 files. Using wild card to avoid multiple lines.
COPY challenges/kali/challenges/hash-identifier/src/password* .


# Install binwalk and other deps
RUN apt-get update && \
  apt-get install hash-identifier && \
  apt-get clean all && \
  rm -rf /var/lib/apt/lists/*

