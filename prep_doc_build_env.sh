#!/bin/sh

# config

VENV='fuel-docs-venv'
VIEW='0'
NOINSTALL='0'
HTML='_build/html/index.html'
SINGLEHTML='_build/singlehtml/index.html'
EPUB='_build/epub/Fuel.epub'
LATEXPDF='_build/latex/fuel.pdf'
PDF='_build/pdf/Fuel.pdf'
WORKINGDIR=`pwd`

# functions

check_if_debian() {
  test -f '/etc/debian_version'
  return $?
}

check_if_redhat() {
  test -f '/etc/redhat-release'
  return $?
}

check_java_present() {
  which java 1>/dev/null 2>/dev/null
  return $?
}

check_latex_present() {
  which pdflatex 1>/dev/null 2>/dev/null
  return $?
}

cd_to_dir() {
  FILE="${0}"
  DIR=`dirname "${FILE}"`
  cd "${DIR}"
  if [ $? -gt 0 ]; then
    echo "Cannot cd to dir ${DIR}!"
    exit 1
  fi
}

redhat_prepare_packages() {
  # prepare postgresql utils and dev packages
  # required to build psycopg Python pgsql library
  sudo yum -y install postgresql postgresql-devel

  # prepare python tools
  sudo yum -y install python-devel make python-pip python-virtualenv
}

debian_prepare_packages() {
  # prepare postgresql utils and dev packages
  # required to build psycopg Python pgsql library
  sudo apt-get -y install postgresql postgresql-server-dev-all

  # prepare python tools
  sudo apt-get -y install python-dev python-pip make python-virtualenv imagemagick libjpeg-dev inkscape
}

install_java() {
  if check_if_debian; then
    sudo apt-get -y install default-jre
  elif check_if_redhat; then
    sudo yum -y install java
  else
    echo 'OS is not supported!'
    exit 1
  fi
}

prepare_packages() {
  if check_if_debian; then
    debian_prepare_packages
  elif check_if_redhat; then
    redhat_prepare_packages
  else
    echo 'OS is not supported!'
    exit 1
  fi
}

prepare_venv() {
  # activate venv
  virtualenv "${VENV}"  # you can use any name instead of 'fuel'
  . "${VENV}/bin/activate" # command selects the particular environment
  # install fuel-docs dependencies
  pip install -r requirements.txt
  # in order to build Fuel API doc sections,
  # get fuel-web repo so latest dependencies are honored
  mkdir -p _build/repos
  cd _build/repos
  git clone https://github.com/stackforge/fuel-web
  cd fuel-web
  # install nailgun dependencies
  pip install ./shotgun  # this fuel project is listed in setup.py requirements
  pip install -r 'nailgun/test-requirements.txt'
  cd "${WORKINGDIR}"
}

download_plantuml() {
  if ! [ -f '/sbin/plantuml.jar' ]; then
    sudo wget 'http://downloads.sourceforge.net/project/plantuml/plantuml.jar' -O '/sbin/plantuml.jar'
  fi
}

view_file() {
  if [ "`uname`" = "Darwin" ]; then
    open "${1}"
  elif [ "`uname`" = "Linux" ]; then
    xdg-open "${1}"
  else
    echo 'OS is not supported!'
    exit 1
  fi
}

build_html() {
  cd "${WORKINGDIR}"
  make html
  if [ "${VIEW}" = '1' ]; then
    view_file "${HTML}"
  fi
}

build_singlehtml() {
  cd "${WORKINGDIR}"
  make singlehtml
  if [ "${VIEW}" = '1' ]; then
    view_file "${SINGLEHTML}"
  fi
}

build_latexpdf() {
  check_latex_present
  if [ $? -gt 0 ]; then
    echo 'You need to install LaTeX if you want to build PDF!'
    exit 1
  fi
  cd "${WORKINGDIR}"
  make latexpdf
  if [ "${VIEW}" = '1' ]; then
    view_file "${LATEXPDF}"
  fi
}

build_epub() {
  cd "${WORKINGDIR}"
  make epub
  if [ "${VIEW}" = '1' ]; then
    view_file "${EPUB}"
  fi
}

build_pdf() {
  cd "${WORKINGDIR}"
  make pdf
  if [ "${VIEW}" = '1' ]; then
    view_file "${PDF}"
  fi
}

clear_build() {
  cd "${WORKINGDIR}"
  make clean
}

show_help() {
cat <<EOF
Documentation build helper
-o - Open generated documentation after build
-c - Clear the build directory
-n - Don't try to install any packages
-f - Documentation format [html,signlehtml,pdf,latexpdf,epub]
EOF
}

# MAIN

while getopts ":onhcf:" opt; do
  case $opt in
    o)
      VIEW='1'
      ;;
    n)
      NOINSTALL='1'
      ;;
    h)
      show_help
      exit 0
      ;;
    c)
      clear_build
      exit 0
      ;;
    f)
      FORMAT="${OPTARG}"
      ;;
    \?)
      echo "Invalid option: -$OPTARG" >&2
      show_help
      exit 1
      ;;
  esac
done

cd_to_dir

check_java_present
if [ $? -gt 0 ]; then
  install_java
fi

if [ "${NOINSTALL}" = '0' ]; then
  prepare_packages
fi

prepare_venv
download_plantuml

if [ "${FORMAT}" = '' ]; then
  FORMAT='html'
fi

case "${FORMAT}" in
html)
  build_html
  ;;
singlehtml)
  build_singlehtml
  ;;
pdf)
  build_pdf
  ;;
latexpdf)
  build_latexpdf
  ;;
epub)
  build_epub
  ;;
*)
  echo "Format ${FORMAT} is not supported!"
  exit 1
  ;;
esac
