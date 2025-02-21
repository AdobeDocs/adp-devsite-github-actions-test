#!/bin/bash

# to run locally:
# cd /Users/melissag/Projects/adp-devsite-github-actions-test/.github/scripts
# ./temp-publish-mds.sh

# root=$1
# path_prefix=$2
# deploy_stage=$3
# deploy_prod=$4

root="../../src/pages"
path_prefix="/github-actions-test/"
deploy_stage=false
deploy_prod=false

if [ "$deploy_stage" == false ] && [ "$deploy_prod" == false ]; then
    echo "exiting"
    exit 1;
fi


env="prod"
clean_cache=true

if [ "$env" == prod ]; then
    home="https://admin.hlx.page/preview/adobedocs/adp-devsite/main"
elif [ "$env" == stage ]; then
    home="https://admin.hlx.page/preview/adobedocs/adp-devsite-stage/main"
else
    # fail 
    exit 1
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
        print_heading "TODO - clean cache"
    fi

    if [ "$env" == prod ]; then
        print_heading "curl -XPOST -vi \"${url}\""
        # curl -XPOST -vi "${url}"
    else
        print_heading "curl -XPOST -vi --header \"x-content-source-authorization: stage\" \"$url\""
        # curl -XPOST -vi --header "x-content-source-authorization: stage" "${url}"
    fi
}

# TODO: may want to only certain types of files up 
# find "${root}" -type f \( -name "*.md" -o -name "*.json" \) -exec echo "{}" \; | while read i; do publish_md $i; done

#sample file name ../../src/pages/redirects.json