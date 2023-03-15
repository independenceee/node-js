// lấy lại lớp
// nếu muốn mở rộng tùy chỉnh từ lớp
// nếu không thì chỉ để phát và xử lý các sự kiện tạo thể hiện

const EventEmitter = require("events");

// bật và phát ra các phương thức 
// theo dõi đơn hàng 
// đối số bổ sung 
// các mô-đun tích hợp sử dụng nó

const customEmitter =  new EventEmitter();

customEmitter.on("response",function (name, id) {
    console.log(`Data recieved user ${name} width id ${id}`);
})

customEmitter.on("response", function() {
    console.log("login next");
})

customEmitter.emit("response", "Independeceee", 17112003)