const fs = require('fs');

function getDatabase() {
    return JSON.parse(fs.readFileSync('data.json', 'utf-8'));
}

function writeDatabase(database){
    fs.writeFileSync('data.json', JSON.stringify(database), 'utf-8');
}

const repository = {
    getDatabase: getDatabase,
    writeDatabase: writeDatabase
};
module.exports = repository;