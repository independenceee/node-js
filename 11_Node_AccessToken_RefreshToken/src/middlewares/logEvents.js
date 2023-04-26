const { format } = require("date-fns");
const { v4: uuid} = require("uuid");


const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const logEvent = async function(message, logName) {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

    try {
        if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs'));
        }

        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logName), logItem);
    } catch (err) {
        console.log(err);
    }
} 

const logger = (request, response, next) => {
    logEvent(`${request.method}\t${request.headers.origin}\t${request.url}`, 'request-log.txt');
    console.log(`${request.method}\t${request.path}`);
    next();
}

module.exports = { logger, logEvent };