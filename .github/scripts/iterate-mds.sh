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

echo_heading() 
{
    heading=$1

    echo ""
    echo ""
    echo "--------------------------------------------------------------------------------"
    echo ""
    echo "$heading"
    echo ""
}

process() 
{
    filename=$1

    path="${path_prefix}${filename#$root/}"
    url="${home}/preview/${org}/${site}/${branch}${path}"

    case "$action" in
        "cache")
            echo "TODO - cache ${url}" 
            echo "2a" 
            ;;
        "publish")
            echo "TODO - publish ${url}" 
            echo "2b"
            ;;
        *)
            fail "Unknown action" ;;
    esac
}

action=$1
env=$2

home="https://admin.hlx.page"
org="adobedocs"
branch="main"
path_prefix="/github-actions-test/"
root="../../src/pages"

case "$env" in
    "stage")
        site="adp-devsite-stage" ;;
    "prod")
        site="adp-devsite" ;;
    *)
        fail "Unknown env" ;;
esac

# TODO: may want to only process certain types of files
find "${root}" -type f \( -name "*.md" -o -name "*.json" \) -exec echo "{}" \; | while read i; do process $i; done