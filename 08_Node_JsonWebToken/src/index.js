require("dotenv").config();
require("express-async-errors");


const express = require("express");
const connectDatabase =require("./databases") ;
const app = express();

const MONGO_DB_URL = process.env.MONGO_DB_URL;
const PORT = process.env.PORT || 5000;
const start = async function() {
    try {
        await connectDatabase(MONGO_DB_URL);
        await app.listen(PORT, function() {
            console.log(`http://localhost:${PORT}`);
        })
    } catch(error) {
        throw new Error(error);
    }
}

start()