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

  local install_command;
  local link_command;

  case $PACKAGE_MANAGER in
    npm)
      install_command="npm install"
      link_command="npm link"
      ;;
    *)
      install_command="quietYarn --frozen-lockfile"
      link_command="quietYarn link"
      ;;
  esac

  set -ex

  ${link_command}

  tmp_dir=$(mktemp -d -t ci-XXXXXXXXXX)
  echo "Project will be in: $tmp_dir"

  cd $tmp_dir
  git clone $REPO
  cd $TEST_DIR

  set +x

  echo ""
  echo "  npm: $(npm --version)"
  echo "  yarn: $(yarn --version)"
  echo "  Node: $(node --version)"
  echo "  PWD: $PWD"
  echo ""

  set -x

  time  ${install_command}
  ${link_command} @nullvoxpopuli/eslint-configs

  case $PACKAGE_MANAGER in
    npm)
      npm explain @nullvoxpopuli/eslint-configs
      time npm exec eslint -- . --quiet
    ;;
    *)
      quietYarn list @nullvoxpopuli/eslint-configs
      quietYarn why @nullvoxpopuli/eslint-configs
      time quietYarn eslint . --quiet
    ;;
  esac
}
