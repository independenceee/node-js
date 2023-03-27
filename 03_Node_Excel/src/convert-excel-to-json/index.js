// Excel -> Json


const express = require("express");
const multer = require("multer");
const excelToJson = require("convert-excel-to-json");
const fs = require("fs-extra");


const app = express();
const PORT = 3000;







const upload = multer({dest: "uploads/"});

app.post("/read", upload.single("file"),async (request, response)=> {
    try {
        if(request.file?.filename == null || request.file?.filename == "undefined") {
            response.status(400).json("No File");
        } else {
            const filePath = "uploads/" +request.file.filename;
            const excelData = excelToJson({
                sourceFile: filePath,
                header: {
                    rows: 1,
                },
                columnToKey: {
                    "*": "{{columnHeader}}",
                }
            })

            fs.remove(filePath);
            response.status(200).json(excelData)
        }
    } catch(error) {
        response.status(500).json({
            message: error,
        })
    }
})


app.listen(PORT);