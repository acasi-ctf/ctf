# Base image is Ubuntu 20.04 LTS
FROM ubuntu:focal

# Fetch initial package lists
RUN apt-get update

# Install editors
RUN apt-get install -y nano vim

# Install common utilities
RUN apt-get install -y sudo curl

# Install pentesting packages
RUN apt-get install -y nmap

# Install openssh-server
RUN apt-get install -y openssh-server

# Create the player user account
RUN useradd -m player

# This builds the keys that are necessary for sshd to start
RUN service ssh start

# Install helper scripts for container management
ADD init.sh /usr/local/bin/
ADD install_key.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/*.sh

# Entrypoint is the SSH daemon
ENTRYPOINT /usr/local/bin/init.sh
