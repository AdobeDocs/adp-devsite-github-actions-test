func=$1
root="./src/pages"

# TODO: may want to only find certain types of files
find "${root}" -type f \( -name "*.md" -o -name "*.json" \) -exec echo "{}" \; | while read i; do func $i; done