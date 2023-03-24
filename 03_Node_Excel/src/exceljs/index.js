const express = require("express");
const excelJs = require("exceljs");
const fs  = require("fs");



const app = express();
const PORT = 5000;


app.get("/export", async (request, response) => {
    try {
        let workBook = new excelJs.Workbook();
        const sheet = workBook.addWorksheet("books");
        sheet.columns = [
            {
                header: "ISBN", key: "isbn", width: 25,
                header: "Title", key: "title", width: 25,
                header: "Author", key: "author", width: 25,
                header: "Pages Count", key: "pages", width: 10,
            }
        ]
        let object = JSON.parse(fs.readFileSync("data.json", 'utf-8'));

        await object.books.map((value, index) => {

            sheet.addRow({
                isbn: value.isbn,
                title: value.title,
                author: value.author,
                pages: value.pages
            })
        })

        response.setHeader(
            "Content-Type", 
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        response.setHeader(
            "content-Disposition",
            "attachment; filename=" +"books.slsx",
        )

        workBook.xlsx.write(response)

    } catch(error) {
        console.log(error);
    }
})
 
app.listen(5000);