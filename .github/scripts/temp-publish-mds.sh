#!/bin/bash

# to run locally:
# cd /Users/melissag/Projects/adp-devsite-github-actions-test/.github/scripts
# ./temp-publish-mds.sh

# root=$1
# path_prefix=$2
# clean_cache=$3
# deploy_stage=$4
# deploy_prod=$5

root="../../src/pages"
path_prefix="/github-actions-test/"
clean_cache=true
deploy_stage=true
deploy_prod=false

error() {
  echo "$@" 1>&2
}

fail() {
  error "$@"
  exit 1
}

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

    if [ "$deploy_stage" == true ]; then
        home="https://admin.hlx.page/preview/adobedocs/adp-devsite-stage/main"
        url="${home}${path_prefix}${filename#$root/}"
        if [ "$clean_cache" == true ]; then
            print_heading "TODO - clean cache"
        fi
        print_heading "curl -XPOST -vi --header \"x-content-source-authorization: stage\" \"$url\""
        curl -XPOST -vi --header "x-content-source-authorization: stage" "${url}"
    fi

    if [ "$deploy_prod" == true ]; then
        home="https://admin.hlx.page/preview/adobedocs/adp-devsite/main"
        url="${home}${path_prefix}${filename#$root/}"
        if [ "$clean_cache" == true ]; then
            print_heading "TODO - clean cache"
        fi
        print_heading "curl -XPOST -vi \"${url}\""
        curl -XPOST -vi "${url}"
    fi
}

if [ "$deploy_stage" == false ] && [ "$deploy_prod" == false ]; then
    fail Missing env
fi

# TODO: may want to only certain types of files up 
# find "${root}" -type f \( -name "*.md" -o -name "*.json" \) -exec echo "{}" \; | while read i; do publish_md $i; done
# publish_md ../../src/pages/redirects.json
echo "Hello"