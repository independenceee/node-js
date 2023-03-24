const XLSX = require("xlsx");
const workbook = XLSX.readFile("data/customers.xlsx");



const workSheet = workbook.Sheets[workbook.SheetNames[0]];


for(let index = 2; index < 7; index ++) {
    const id = workSheet[`A${index}`].v;
    const name = workSheet[`B${index}`].v;


    console.log(id, name);
}