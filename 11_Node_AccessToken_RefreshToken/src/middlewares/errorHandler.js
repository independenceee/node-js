const { logEvent } = require("./logEvents");


const errorHandler = function(error, request, response, next) {
    logEvent(`${error.name}: ${error.message}`, 'error-log.txt');
    console.log(error.stack);
    response.status(500).send(error.message);
}

module.exports = errorHandler;
