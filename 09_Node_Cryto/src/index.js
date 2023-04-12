const crypto = require("crypto");
// Tạo một cặp khóa RSA
const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
  modulusLength: 1000,
  publicKeyEncoding: {
    type: "spki",
    format: "pem",
  },
  privateKeyEncoding: {
    type: "pkcs8",
    format: "pem",
  },
});
// Đối tượng cần mã hóa
const data = { name: " nguyen van a", gender: "male", email: "a@gmail.com" };
console.log("data trước khi mã hóa :>> ", data);
console.log();

// Chuyển đổi đối tượng thành chuỗi JSON
const jsonData = JSON.stringify(data);
// Mã hóa dữ liệu bằng khóa công khai
const encryptedData = crypto.publicEncrypt(publicKey, Buffer.from(jsonData));

console.log("data sau khi mã hóa :>> ", encryptedData.toString("base64"));
console.log();

// Giải mã dữ liệu bằng khóa riêng tư
try {
  const decryptedData = crypto.privateDecrypt(privateKey, encryptedData);

  console.log("Sau khi giải mã: >>> ", JSON.parse(decryptedData.toString()));
  console.log();
} catch (error) {
  console.log("decryptedData :>> ", error);
}

console.log("publicKey >>> ", publicKey);
console.log("privateKey >>> ", privateKey);
