#!/bin/bash

home="https://admin.hlx.page/preview/adobedocs/adp-devsite/main"
root=$1
path_prefix=$2

publish()
{
    filename=$1
    root_removed_filename=${filename/#$root}
    url="${home}${path_prefix}${root_removed_filename}"

    echo ""
    echo "curl -XPOST -vi ${url}"
    curl -XPOST -vi "${url}"
}

find ./src/pages -type f -name "*.md" -exec echo "{}" \; | while read i; do publish $i; done
