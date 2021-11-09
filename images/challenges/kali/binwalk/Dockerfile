# Dockerfile - binwalk Tutorial
FROM ghcr.io/acasi-ctf/ctf/penimage:latest

WORKDIR /home/player

#Install packages and install binwalk
RUN apt-get update && \
  apt-get -yq --no-install-recommends install binutils binwalk unzip && \
  apt-get clean all && \
  rm -rf /var/lib/apt/lists/*

# Copy over executable
COPY challenges/kali/challenges/binwalk/src/pictures.zip .

RUN unzip pictures.zip
RUN rm pictures.zip
