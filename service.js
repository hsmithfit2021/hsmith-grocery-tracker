const repository = require("./repository.js");

async function get(id) {
    const item = await repository.getItem(id);
    if(!item) {
        return {message: "Unsuccessful"};
    }
    return {message: "Successful", content: item }
}
async function add(listItem) {
    if(await repository.getItem(listItem.id)) {
        return {message: "Item duplicate"};
    }

    const item = await repository.addItem(listItem);
    if(!item) {
        return {message: "Unsuccessful"};
    }
    return {message: "Successful", content: item }
}

async function update(listItem) {
    if(!await repository.getItem(listItem.id)) {
        return {message: "Item not found"};
    }

    const item = await repository.updateItem(listItem);
    if(!item) {
        return {message: "Unsuccessful"};
    }
    return {message: "Successful", content: item }
}
async function deleteFromDatabase(listItem) {
    const item = await repository.deleteItem(listItem.id);
    if(!item) {
        return {message: "Unsuccessful"};
    }
    return {message: "Successful", content: true }
}

const service = {
    get,
    add,
    update,
    deleteFromDatabase
};
module.exports = service;