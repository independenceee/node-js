const {createReadStream} = require("fs");

// mặc định 64kb 
// tải bộ đệm - phần còn lại 
// highWaterMark - kích thước điều khiển

const stream = createReadStream('./content/big.txt')

stream.on('data', (result) => {
  console.log(result)
})
stream.on('error', (err) => console.log(err))