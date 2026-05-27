const fs = require("fs");

const filePath = "./index.md";
const stats = fs.statSync(filePath);

console.log(`File: ${filePath}`);
console.log(`Last modified (mtime): ${stats.mtime}`);
