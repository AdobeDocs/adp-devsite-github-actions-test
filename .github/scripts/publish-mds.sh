#!/bin/bash

home="https://admin.hlx.page/preview/adobedocs/adp-devsite/main"
root=$1
path_prefix=$2

publish()
{
    filename=$1
    to_remove="$root/"
    relative_filename=${filename/#$to_remove}
    url="${home}${path_prefix}${relative_filename}"

    echo ""
    echo "curl -XPOST -vi ${url}"
    curl -XPOST -vi "${url}"
}

find "${root}" -type f -name "*.**" -exec echo "{}" \; | while read i; do publish $i; done
