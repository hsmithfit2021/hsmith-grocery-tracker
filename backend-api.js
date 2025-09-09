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


async function handleGet(req, res) {
    const id = req.url.split("/")[1];
    if(req.url.split("/").length === 1) {

    }
    else {
        const item = await service.get(id);
        res.statusCode = 200; // OK
        res.end(JSON.stringify(items));
    }
}

async function handlePost(req, res) {
    let body = "";

    req.on('data', (chunk) => {
        body += chunk;
    });
    req.on('end', async () => {
        let listItem = JSON.parse(body);
        const item = await service.add(listItem);

        res.statusCode = 201; // CREATED
        res.end(JSON.stringify(item));
    });
}
async function handlePut(req, res) {
    let body = "";

    req.on('data', (chunk) => {
        body += chunk;
    });
    req.on('end', async () => {
        let listItem = JSON.parse(body);
        const item = await service.update(listItem);

        res.statusCode = 200; // OK
        res.end(JSON.stringify(item));
    });
}

async function handleDelete(req, res) {
    let body = "";

    req.on('data', (chunk) => {
        body += chunk;
    });
    req.on('end', async () => {
        let listItem = JSON.parse(body);
        const item = await service.deleteFromDatabase(listItem);

        res.statusCode = 204; // NO CONTENT
        res.end();
    });
}

server.listen(PORT, () => {
    logger.info(`Server is running on http://localhost:${PORT}`);
});