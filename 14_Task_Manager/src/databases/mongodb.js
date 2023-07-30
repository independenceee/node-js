const mongoose = require("mongoose");

const connectMongoDb = function (url) {
  return mongoose.connect(url, {
    useNewUrlParser: true,
  });
};

module.exports = connectMongoDb;
