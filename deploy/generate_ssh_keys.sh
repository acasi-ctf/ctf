#!/usr/bin/env bash
set -e

cd "$(dirname "$0")"
ssh-keygen -f base/id_rsa -q -N ""
