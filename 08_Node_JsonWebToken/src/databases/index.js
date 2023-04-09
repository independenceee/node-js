const mongoose = require("mongoose");


const connectDatabase =  function(url) {
    return mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
}

module.exports = connectDatabase;