#!/bin/bash

home="https://admin.hlx.page/preview/adobedocs/adp-devsite/main"
root=$1
path_prefix=$2

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
