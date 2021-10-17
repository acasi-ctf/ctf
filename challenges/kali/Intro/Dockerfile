#DockerRunFile Draft - Kali Linux

FROM gcc:11 AS builder

WORKDIR /

COPY lock.cpp .
RUN g++ -o lock lock.cpp

FROM ghcr.io/acasi-ctf/ctf/penimage:latest

WORKDIR /home/player

# RUN apt update -y && \
	# apt dist-upgrade -y && \
	# apt autoremove && \
	# apt clean && \
	# apt install kali-tools-top10 -y

COPY --from=builder /lock /home/player/lock