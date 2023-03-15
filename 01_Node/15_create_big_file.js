const { writeFileSync} = require("fs");
for (let index = 0; index< 1000; index ++) {
    writeFileSync("./contents/big.txt", `Hello ${index}`, {
        flag: ''
    })
}