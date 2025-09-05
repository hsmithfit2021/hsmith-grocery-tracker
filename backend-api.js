const http = require('http');
const winston = require('winston');
const service = require("./service.js")

const PORT = 3000;

let logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({ filename: 'somefile.log' })
    ]
});


const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    switch(req.method) {
        case 'GET':
            handleGet(req, res);
            break;

        case 'POST':
            handlePost(req, res);
            break;

        case 'PUT':
            handlePut(req, res);
            break;

        case 'DELETE':
            handleDelete(req, res);
            break;

        default:
            res.statusCode = 405; // method not allowed
            res.end(JSON.stringify({message: "Method not supported"}))
            break;
    }

});


function handleGet(req, res) {
    let listItems = service.get();
    res.statusCode = 200; // OK
    res.end(JSON.stringify(listItems));
}

function handlePost(req, res) {
    let body = "";

    req.on('data', (chunk) => {
        body += chunk;
    });
    req.on('end', () => {
        let listItem = JSON.parse(body);
        service.add(listItem);

        res.statusCode = 201; // CREATED
        res.end(JSON.stringify(listItem));
    });
}
function handlePut(req, res) {
    let body = "";

    req.on('data', (chunk) => {
        body += chunk;
    });
    req.on('end', () => {
        let listItem = JSON.parse(body);
        service.update(listItem);

        res.statusCode = 200; // OK
        res.end(JSON.stringify(listItem));
    });
}

function handleDelete(req, res) {
    let body = "";
    let listItems = repository.getDatabase();

    req.on('data', (chunk) => {
        body += chunk;
    });
    req.on('end', () => {
        let listItem = JSON.parse(body);
        service.delete(listItem);

        res.statusCode = 204; // NO CONTENT
        res.end();
    });
}

server.listen(PORT, () => {
    logger.info(`Server is running on http://localhost:${PORT}`);
});