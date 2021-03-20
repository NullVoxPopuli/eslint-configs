#!/bin/bash
#
# -e : exits if any command fails
# -x : print each command before running it
#
set -ex

function quietYarn() {
  # removes warnings from CLI output
  yarn $@ 2> >(grep -v warning 1>&2)
}


yarn link

tmp_dir=$(mktemp -d -t ci-XXXXXXXXXX)
echo "Project will be in: $tmp_dir"

cd $tmp_dir
git clone https://github.com/NullVoxPopuli/emberclear.git
cd emberclear/client/web
time quietYarn install --frozen-lockfile
quietYarn link @nullvoxpopuli/eslint-configs

# Info
quietYarn list @nullvoxpopuli/eslint-configs
quietYarn why @nullvoxpopuli/eslint-configs
ls -la node_modules/@nullvoxpopuli/eslint-configs

# Actually lint
time yarn eslint . --quiet
