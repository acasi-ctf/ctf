#!/usr/bin/env bash
set -e

sudo -E -u player /usr/local/bin/install_key.sh

echo "Starting sshd..."
/usr/sbin/sshd -D
