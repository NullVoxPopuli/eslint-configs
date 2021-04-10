#!/bin/bash
#
# -e : exits if any command fails
# -x : print each command before running it
# -a : exposes variables to sub shells

set -a

REPO="https://github.com/NullVoxPopuli/highlightjs-glimmer.git"
TEST_DIR="highlightjs-glimmer"

source "$(dirname "${BASH_SOURCE[0]}")/-helpers.sh"

lint
