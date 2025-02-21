#!/bin/bash

env=$1

print() {
    filename = $1
    echo "${filename}"
}

sh .github/scripts/find-files.sh "${print}"