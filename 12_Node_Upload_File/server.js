const express = require("express");
const multer = require("multer");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));



const storage = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, "public");
    },
    filename: (request, file, callback) => {
        const path = Date.now()+"-"+file.originalname;
        console.log(path)
        callback(null, path);
    }
})

const upload = multer({storage}).single("file");



app.post("/upload", (request, response) => {
    upload(request, response, (error) => {
        if(error) {
            response.status(500).json(error);
        }


        return response.status(200).send(request.file)
    })
})


app.listen(8000, function() {
    console.log("serverstart")
})

// const express = require("express");
// const multer = require("multer");
// const cors = require("cors");

// const app = express();

// app.use(cors());
// app.use(express.json());
// app.use(express.static('public'));


// const storage = multer.diskStorage({
//     destination: (request, file, callback) => {
//         callback(null, "public");
//     },
//     filename: (request, file, callback) => {
//         callback(null, Date.now() + "-" + file.originalname);
//     }
// })

// const upload = multer({storage}).array("file");



// app.post("/upload", (request, response) => {
//     upload(request, response, (error) => {
//         if(error) {
//             response.status(500).json(error);
//         }

//         console.log(request.file)
//         return response.status(200).send(request.file)
//     })
// })


// app.listen(8000, function() {
//     console.log("serverstart")
// })