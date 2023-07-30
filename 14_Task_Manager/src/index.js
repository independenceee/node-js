require("dotenv").config();
const express = require("express");

const connectMongoDb = require("./databases/mongodb");
const router = require("./routes");
const app = express();

app.use(express.static("public"));
app.use(express.json());

router(app);
const PORT = process.env.PORT || 5000;
const start = async function () {
  try {
    await connectMongoDb(process.env.MONGODB_URL);
    app.listen(PORT, function () {
      console.log(`http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
