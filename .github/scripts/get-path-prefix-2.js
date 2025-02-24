// to run locally: 
// cd /Users/melissag/Projects/adp-devsite-github-actions-test/.github/scripts
// node get-path-prefix-2

async function sdf() {
    console.log('~~ hello 2');
    const url = "https://raw.githubusercontent.com/aemsites/devsite-runtime-connector/refs/heads/main/src/devsite-paths.json";

    const obj = await (await fetch(url)).json();
    console.log('~~ obj', obj);
};

sdf();


  

