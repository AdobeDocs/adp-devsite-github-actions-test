#!/bin/bash

fail() {
  echo "$@" 1>&2
  exit 1
}

ROOT="./src/pages"
OPERATION=$1
BRANCH=$2
PATH_PREFIX=$3

# conditional http_method
case "$OPERATION" in
    cache | preview | live)
        http_method="POST" ;;
    *)
        fail "Unknown operation" ;;
esac

# conditional site
case "$BRANCH" in
    stage)
        site="adp-devsite-stage" ;;
    main)
        site="adp-devsite" ;;
    *)
        fail "Unknown branch" ;;
esac

# conditional args
if [ "$BRANCH" == "stage" ] && [ "$OPERATION" == "preview" ]
then
    args="--header \"x-content-source-authorization: stage\""
else 
    args=""
fi

process() 
{
    filename=$1
    path="${PATH_PREFIX:1:-1}/${filename#$ROOT/}"
    url="https://admin.hlx.page/${OPERATION}/adobedocs/${site}/${BRANCH}/${path}"
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
find "${ROOT}" -type f \( -name "*.md" -o -name "*.json" \) -exec echo "{}" \; | while read i; do process $i; done

summarize
