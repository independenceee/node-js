// GLOBALS  - NO WINDOW


// __dirname  - đường dẫn đến thư mục hiện tại
// __filename - tên file
// require    - function to sử dụng modules (CommonJS)
// module     - thông tin về module hiện tại (file)
// process    - thông tin về env nơi chương trình đang được thực thi


console.log(__dirname);

setTimeout(function() {
    console.log("Chạy sau 3s");
}, 3000);

setInterval(function() {
    console.log("3s bắn một log");
}, 1000)