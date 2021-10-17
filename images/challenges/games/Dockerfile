FROM ghcr.io/acasi-ctf/ctf/penimage:latest

RUN apt-get update && \
  apt-get -yq --no-install-recommends install openjdk-8-jdk-headless && \
  apt-get clean all && \
  rm -rf /var/lib/apt/lists/*

WORKDIR /home/player
COPY challenges/java-games/Dice.java .
COPY challenges/java-games/DiceGroup.java .
COPY challenges/java-games/Prompt.java .
COPY challenges/java-games/Yahtzee.java .
COPY challenges/java-games/YahtzeePlayer.java .
COPY challenges/java-games/YahtzeeScoreCard.java .
RUN javac *.java
RUN rm *.java

ENTRYPOINT ["java", "Yahtzee"]
