# -e : exits if any command fails
# -x : print each command before running it
LINT_PACKAGE="@nullvoxpopuli/eslint-configs"
LINT_DIR="$PWD"

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

  local link_command;

  case $PACKAGE_MANAGER in
    npm)
      link_command="npm link"
      ;;
    *)
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
  echo "  LINT_PACKAGE: $LINT_PACKAGE"
  echo "  LINT_DIR: $LINT_DIR"
  echo "  TEST_DIR: $TEST_DIR"
  echo ""

  set -x

  case $PACKAGE_MANAGER in
    npm)
      time npm install
      # Somehow link doesn't work?
      cp $LINT_DIR/* node_modules/$LINT_PACKAGE/ -r
      time npm run lint:js
    ;;
    *)
      time quietYarn install
      quietYarn link $LINT_PACKAGE
      time quietYarn eslint . --quiet
    ;;
  esac
}
