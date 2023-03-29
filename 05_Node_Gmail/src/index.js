require("dotenv").config()
const nodeMailer = require("nodemailer");


const html = `<h1>Hello World !</h1>`

const main = async function() {
    try {
        const trasporter = nodeMailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            secure: false,
            auth: {
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD,

            }
        })

        const info = await trasporter.sendMail({
            from: "nguyenkhanh17112003@gmail.com",
            to: "hoangpham23052003@gmail.com",
            subject: "You are best friends",
            html: html
        })

        console.log("Message sent: " + info.messageId);
    } catch(error) {
        console.log(error);
    }
}

main();