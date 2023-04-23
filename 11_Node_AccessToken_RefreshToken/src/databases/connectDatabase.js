const mongoose = require("mongoose");


const connectDatabase = async function(url) {
    try {
        await mongoose.connect(url, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
    } catch(error) {
        console.error(error);
    }
}


module.exports = connectDatabase;