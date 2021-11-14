# Dockerfile - binwalk Tutorial
FROM ghcr.io/acasi-ctf/ctf/penimage:latest

WORKDIR /home/player

# Install binwalk and other deps
RUN apt-get update && \
  apt-get -yq --no-install-recommends install binwalk unzip wget && \
  apt-get clean all && \
  rm -rf /var/lib/apt/lists/*

# Download pictures.zip from GCS.
RUN wget --no-check-certificate https://storage.googleapis.com/clfa-challenge-data/pictures.zip

RUN unzip pictures.zip
RUN rm pictures.zip
