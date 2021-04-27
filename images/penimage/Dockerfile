# Base image is Ubuntu 20.04 LTS
FROM ubuntu:focal

# Install packages
RUN apt-get update && \
  apt-get -yq --no-install-recommends install nano vim curl nmap openssh-server sudo python3 && \
  apt-get clean all && \
  rm -rf /var/lib/apt/lists/*

# Create the player user account
RUN useradd -m player -s /bin/bash

# This builds the keys that are necessary for sshd to start
RUN service ssh start

# Install helper scripts for container management
COPY init.sh /usr/local/bin/
COPY install_key.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/*.sh

# Entrypoint is the SSH daemon
ENTRYPOINT /usr/local/bin/init.sh
