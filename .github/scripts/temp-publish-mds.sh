#!/bin/bash

# to run locally:
# cd /Users/melissag/Projects/adp-devsite-github-actions-test/.github/scripts
# ./temp-publish-mds.sh

root="../../src/pages"
path_prefix="/github-actions-test/"
env="stage"
clean_cache=false

if [ "$env" == prod ]; then
    home="https://admin.hlx.page/preview/adobedocs/adp-devsite/main"
else
    home="https://admin.hlx.page/preview/adobedocs/adp-devsite-stage/main"
fi

publish_md()
{
    filename=$1
    echo "$filename"
    url="${home}${path_prefix}${filename#$root/}"

    echo ""
    if [ "$clean_cache" == true ]; then
        echo "TODO - clean cache"
    fi

    echo ""
    if [ "$env" == prod ]; then
        echo "TODO - publish on prod"
    else
        echo "TODO - publish on stage"
    fi
}

# TODO: may want to only certain types of files up 
find "${root}" -type f \( -name "*.md" -o -name "*.json" \) -exec echo "{}" \; | while read i; do publish_md $i; done
