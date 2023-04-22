require('dotenv').config();
const express = require("express");
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');


const app = express();

const PORT = process.env.PORT || 5000;
const start = async function() {
    try {
        await app.listen(PORT, function() {
            return console.log(`http://localhost:${PORT}`);
        })
    } catch(error) {
        console.log(error)
    }
}

;(function() {
    start();
});