FROM ghcr.io/acasi-ctf/ctf/penimage:latest

RUN apt-get update && \
  apt-get -yq --no-install-recommends install openjdk-8-jdk-headless && \
  apt-get clean all && \
  rm -rf /var/lib/apt/lists/*

WORKDIR /home/player
COPY challenges/games/challenges/prize/src/Prize.java .

RUN javac *.java
RUN rm *.java
