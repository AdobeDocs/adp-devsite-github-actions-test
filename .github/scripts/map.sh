#!/bin/bash

# to run locally:
# cd /Users/melissag/Projects/adp-devsite-github-actions-test/.github/scripts
# ./map.sh

root="../../src/pages"
path_prefix="/github-actions-test/"
env="stage"
cleanCache=false

if [ "$env" == prod ]; then
    home="https://admin.hlx.page/preview/adobedocs/adp-devsite/main"
else
    home="https://admin.hlx.page/preview/adobedocs/adp-devsite-stage/main"
fi

if [ "$cleanCache" == true ]; then
    echo "do cleanCache"
else
    echo "don't cleanCache"
fi

publish()
{
    filename=$1
    url="${home}${path_prefix}${filename#$root/}"

    echo ""
    echo "url: ${url}"
    # curl -XPOST -vi "${url}"
}

# TODO: may want to only certain types of files up 
# find "${root}" -type f \( -name "*.md" -o -name "*.json" \) -exec echo "{}" \; | while read i; do donothing $i; done
