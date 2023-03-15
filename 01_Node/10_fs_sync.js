const fs = require("fs");

const readFileSync = fs.readFileSync('./contents/first.txt', 'utf-8');
fs.writeFileSync("./contents/fs_sync.txt", `Result is ${readFileSync}`, {flag: ''});
