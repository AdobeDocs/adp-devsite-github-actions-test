#!/bin/bash

operation=$1
branch=$2
path_prefix=$3
root="./src/pages"

error() {
  echo "$@" 1>&2
}

fail() {
  error "$@"
  exit 1
}

process() 
{
    filename=$1
    path="${path_prefix:1}${filename#$root/}"
    url="https://admin.hlx.page/${operation}/adobedocs/${site}/${branch}/${path}"
    cmd="curl -X${http_method} -vi ${args} \"${url}\""

    echo ""
    echo ""
    echo "--------------------------------------------------------------------------------"
    echo ""
    echo "${cmd}"
    echo ""

    eval "${cmd}"
}

case "$operation" in
    cache | preview | live)
        http_method="POST" ;;
    *)
        fail "Unknown operation" ;;
esac

case "$branch" in
    stage)
        site="adp-devsite-stage" ;;
    main)
        site="adp-devsite" ;;
    *)
        fail "Unknown branch" ;;
esac

if [ "$branch" == "stage" ] && [ "$operation" == "preview" ]
then
    args="--header \"x-content-source-authorization: stage\""
else 
    args=""
fi

# TODO: may want to only process certain types of files
find "${root}" -type f \( -name "*.md" -o -name "*.json" \) -exec echo "{}" \; | while read i; do process $i; done