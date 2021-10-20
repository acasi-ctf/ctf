# Dockerfile - Binwalk Tutorial
FROM ghcr.io/acasi-ctf/ctf/penimage:latest

WORKDIR /home/player

# Install packages
RUN apt-get update && \
  apt-get -yq --no-install-recommends install binutils && \
  apt-get clean all && \
  rm -rf /var/lib/apt/lists/*

# Copy over executable
COPY challenges\kali\challenges\binwalk\src\pictures.zip .

