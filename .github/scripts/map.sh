#!/bin/bash

# to run locally:
# cd /Users/melissag/Projects/adp-devsite-github-actions-test/.github/scripts
# ./map.sh

home="https://admin.hlx.page/preview/adobedocs/adp-devsite/main"
root="../../src/pages"
path_prefix="/github-actions-test/"

publish()
{
    filename=$1
    url="${home}${path_prefix}${filename#$root/}"

    echo ""
    echo "url: ${url}"
    # curl -XPOST -vi "${url}"
}

# TODO: may want to only certain types of files up 
find "${root}" -type f \( -name "*.md" -o -name "*.json" \) -exec echo "{}" \; | while read i; do publish $i; done
