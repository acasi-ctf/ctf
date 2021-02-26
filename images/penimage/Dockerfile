# Base image is Ubuntu 20.04 LTS
FROM ubuntu:focal

# Fetch initial package lists
RUN apt-get update

# Install packages
RUN apt-get -yq update && \
  apt-get install -yq --no-install-recommends nano vim curl nmap openssh-server && \
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
