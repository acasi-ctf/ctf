#!/usr/bin/env bash
set -e

export HOMEDIR=~player
mkdir "$HOMEDIR/.ssh/"
chmod 700 "$HOMEDIR/.ssh/"
touch "$HOMEDIR/.ssh/authorized_keys"
chmod 600 "$HOMEDIR/.ssh/authorized_keys"
echo "${PUBLIC_KEY}" >> "$HOMEDIR/.ssh/authorized_keys"
