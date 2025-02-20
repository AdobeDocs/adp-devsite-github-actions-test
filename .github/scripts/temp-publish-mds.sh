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
    url="${home}${path_prefix}${filename#$root/}"

    if [ "$clean_cache" == true ]; then
        echo ""
        echo "TODO - clean cache"
    fi

    if [ "$env" == prod ]; then
        echo ""
        echo "TODO - publish on prod"
    else
        echo ""
        echo "curl -XPOST -vi --header \"x-content-source-authorization: stage\" \"$url\""
        curl -XPOST -vi --header "x-content-source-authorization: stage" "${url}"
    fi
}

# TODO: may want to only certain types of files up 
find "${root}" -type f \( -name "*.md" -o -name "*.json" \) -exec echo "{}" \; | while read i; do publish_md $i; done

#sample file name ../../src/pages/redirects.json