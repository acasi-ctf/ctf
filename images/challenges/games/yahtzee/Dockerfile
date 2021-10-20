FROM ghcr.io/acasi-ctf/ctf/penimage:latest

RUN apt-get update && \
  apt-get -yq --no-install-recommends install openjdk-8-jdk-headless && \
  apt-get clean all && \
  rm -rf /var/lib/apt/lists/*

WORKDIR /home/player
COPY challenges/games/challenges/yahtzee/src/Dice.java .
COPY challenges/games/challenges/yahtzee/src/DiceGroup.java .
COPY challenges/games/challenges/yahtzee/src/Prompt.java .
COPY challenges/games/challenges/yahtzee/src/Yahtzee.java .
COPY challenges/games/challenges/yahtzee/src/YahtzeePlayer.java .
COPY challenges/games/challenges/yahtzee/src/YahtzeeScoreCard.java .
RUN javac *.java
RUN rm *.java
