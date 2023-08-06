require("dotenv").config();
require("express-async-error");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDatabase = require("./databases/connect");
const router = require("./router/index.routes");

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
router(app);

const start = async function () {
    try {
        await connectDatabase(process.env.MONGODB_URL);
        app.listen(process.env.PORT || 3000, function () {
            console.log(`http://localhost:${process.env.PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
};

(function () {
    start();
})();
