#!/bin/bash

fail() {
  echo "$@" 1>&2
  exit 1
}

root="../../src/pages"
operation=$1
branch=$2
path_prefix=$3

# conditional http_method
case "$operation" in
    cache | preview | live)
        http_method="POST" ;;
    *)
        fail "Unknown operation" ;;
esac

# conditional site
case "$branch" in
    stage)
        site="adp-devsite-stage" ;;
    main)
        site="adp-devsite" ;;
    *)
        fail "Unknown branch" ;;
esac

# conditional args
if [ "$branch" == "stage" ] && [ "$operation" == "preview" ]
then
    args="--header \"x-content-source-authorization: stage\""
else 
    args=""
fi

process() 
{
    filename=$1
    path="${path_prefix:1}/${filename#$root/}"
    url="https://admin.hlx.page/${operation}/adobedocs/${site}/${branch}/${path}"
    cmd="curl -X${http_method} -vi ${args} \"${url}\""

    echo ""
    echo ""
    echo "--------------------------------------------------------------------------------"
    echo ""
    echo "${cmd}"
    echo ""

    # run command and extract failure string
    failure=$(eval "${cmd} | grep -e \"x-error:\"")

    # append to failures
    if [ "$failure" != "" ]
    then
        failures="${failures}\n${cmd}\n${failure}\n"
    fi 
    
    # write failures to stderr so it can be accessed outside this subshell later
    echo $failures > 2
}

summarize() {
    echo ""
    echo ""
    echo "================================================================================"
    echo ""

    # read failures from stderr to access it from this parent shell
    read -r failures < 2

    if [ "${failures}" == "" ]
    then
        echo "Success!"
    else 
        echo "Failures:"
        echo -e "${failures}"
    fi

    echo ""
}

# process mds in root
# TODO: may want to only process certain types of files
find "${root}" -type f \( -name "*.md" -o -name "*.json" \) -exec echo "{}" \; | while read i; do process $i; done

summarize
