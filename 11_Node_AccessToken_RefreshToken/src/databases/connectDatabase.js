const mongoose = require("mongoose");


const connectDatabase = async function() {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
    } catch(error) {
        console.error(error);
    }
}


module.exports = connectDatabase;