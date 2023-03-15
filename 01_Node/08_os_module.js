const os = require("os");

const user = os.userInfo();
console.log(user); // thông tin người sử dụng hiện tại
// {
//     uid: 1000,
//     gid: 1000,
//     username: 'independence',
//     homedir: '/home/independence',
//     shell: '/bin/bash'
// }

console.log(`The System Uptime is ${os.uptime()} seconds`)
// thời gian hoạt động của hệ thống tính bằng giây

const currentOS = {
  name: os.type(),
  release: os.release(),
  totalMem: os.totalmem(),
  freeMem: os.freemem(),
}
console.log(currentOS);

// The System Uptime is 4431.71 seconds
// {
//   name: 'Linux',
//   release: '5.15.90.1-microsoft-standard-WSL2',
//   totalMem: 4059152384,
//   freeMem: 1873006592
// }