# -e : exits if any command fails
# -x : print each command before running it

function quietYarn() {
  # removes warnings from CLI output
  yarn $@ 2> >(grep -v warning 1>&2)
}

function lint() {

  echo ""
  echo "Testing Lint for $TEST_DIR within $REPO"
  echo ""
  echo "  Node: $(node --version)"
  echo "  PWD: $PWD"
  echo ""
  echo ""

  set -ex

  yarn link

  tmp_dir=$(mktemp -d -t ci-XXXXXXXXXX)
  echo "Project will be in: $tmp_dir"

  cd $tmp_dir
  git clone $REPO
  cd $TEST_DIR
  time quietYarn install --frozen-lockfile
  quietYarn link @nullvoxpopuli/eslint-configs

  # Info
  quietYarn list @nullvoxpopuli/eslint-configs
  quietYarn why @nullvoxpopuli/eslint-configs
  ls -la node_modules/@nullvoxpopuli/eslint-configs

  # Actually lint
  time yarn eslint . --quiet
}
