const mongoose = require("mongoose");

const connectDatabase = async function (url) {
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
        });
    } catch (error) {
        console.log(error);
    }
};

module.exports = connectDatabase;
