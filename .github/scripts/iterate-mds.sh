#!/bin/bash


# to run locally: (chmod +x ./iterate-mds.sh)
# cd /Users/melissag/Projects/adp-devsite-github-actions-test/.github/scripts
# ./temp-publish-mds.sh

error() {
  echo "$@" 1>&2
}

fail() {
  error "$@"
  exit 1
}

run() 
{
    filename=$1
    echo "${filename}"
}

action=$1
env=$2
root="../../src/pages"

if ! [ "$action" == "cache" ] && ! [ "$action" == "publish" ]
then
    fail Invalid action
fi

if ! [ "$env" == "stage" ] && ! [ "$env" == "prod" ]
then
    fail Invalid env
fi

# TODO: may want to only process certain types of files
find "${root}" -type f \( -name "*.md" -o -name "*.json" \) -exec echo "{}" \; | while read i; do run $i; done