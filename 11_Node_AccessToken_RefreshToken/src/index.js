require('dotenv').config();
const express = require("express");
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDatabase = require("./databases/connectDatabase");
const router = require('./routes/index.routes');
const errorHandler = require("./middlewares/errorHandler")
const corsOptions = require("./configs/corsOptions")
const { logger } = require("./middlewares/logEvents");
const credentials = require('./middlewares/credentials');
const app = express();


app.use(credentials);
app.use(logger);
app.use(errorHandler);
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use(cookieParser())


router(app);

const PORT = process.env.PORT || 5000;
const start = async function() {
    try {
        await connectDatabase(process.env.MONGODB_URL);
        await app.listen(PORT, function() {
            return console.log(`http://localhost:${PORT}`);
        })
    } catch(error) {
        console.log(error)
    }
}

;(function() {
    start();
})();