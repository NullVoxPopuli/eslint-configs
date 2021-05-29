#!/bin/bash
#
# -e : exits if any command fails
# -x : print each command before running it
# -a : exposes variables to sub shells

set -a

REPO="https://github.com/NullVoxPopuli/limber.git"
TEST_DIR="limber/frontend"
PACKAGE_MANAGER="yarn"

source "$(dirname "${BASH_SOURCE[0]}")/-helpers.sh"

lint
