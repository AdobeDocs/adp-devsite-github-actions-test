// to run locally: 
// cd /Users/melissag/Projects/adp-devsite-github-actions-test/.github/scripts
// node get-path-prefix-2

const test = async () => {
    console.log('~~ hello 2');
    const url = "https://raw.githubusercontent.com/aemsites/devsite-runtime-connector/refs/heads/main/src/devsite-paths.json";

    const fs = await require('fs');    
    if (!fs.existsSync('../../src/pages/config.md')) {
        console.log('file doesnt exist');
    } else {
        console.log('file exists')
    }

    const obj = await (await fetch(url)).json();
    // console.log('~~ obj', obj);
};

test();


  

