#!/usr/bin/env bash
set -e

if [ -z "$1" ]; then
  echo "Usage: ./generate_ssh_keys.sh [directory]"
  exit 1
fi

cd "$(dirname "$0")"
ssh-keygen -f "$1/id_rsa" -q -N ""
