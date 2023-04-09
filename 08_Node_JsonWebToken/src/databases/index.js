const mongoose = require("mongoose");


const connectDatabase = function(url) {
    return mongoose.connect(url, {
        useNewUrlParser: true,
    })
}

module.exports = connectDatabase;