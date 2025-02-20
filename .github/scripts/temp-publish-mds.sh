#!/bin/bash

# to run locally:
# cd /Users/melissag/Projects/adp-devsite-github-actions-test/.github/scripts
# ./temp-publish-mds.sh

root="../../src/pages"
path_prefix="/github-actions-test/"
env="prod"
clean_cache=true

if [ "$env" == prod ]; then
    home="https://admin.hlx.page/preview/adobedocs/adp-devsite/main"
else
    home="https://admin.hlx.page/preview/adobedocs/adp-devsite-stage/main"
fi

print_heading() 
{
    heading=$1

    echo ""
    echo ""
    echo "--------------------------------------------------------------------------------"
    echo ""
    echo "$heading"
    echo ""
}

publish_md()
{
    filename=$1
    url="${home}${path_prefix}${filename#$root/}"

    if [ "$clean_cache" == true ]; then
        echo ""
        echo "TODO - clean cache"
    fi

    if [ "$env" == prod ]; then
        print_heading "curl -XPOST -vi \"${url}\""
        curl -XPOST -vi "${url}"
    else
        print_heading "curl -XPOST -vi --header \"x-content-source-authorization: stage\" \"$url\""
        curl -XPOST -vi --header "x-content-source-authorization: stage" "${url}"
    fi
}

# TODO: may want to only certain types of files up 
find "${root}" -type f \( -name "*.md" -o -name "*.json" \) -exec echo "{}" \; | while read i; do publish_md $i; done

#sample file name ../../src/pages/redirects.json