const repository = require("./repository.js");

function get() {
    return repository.getDatabase();
}
function add(listItem) {
    let listItems = repository.getDatabase();
    listItems.grocery_list.push(listItem);

    repository.writeDatabase(listItems);  
    return true;
}

function update(listItem) {
    let listItems = repository.getDatabase();
    let foundItem = listItems.grocery_list.find((item) => item.name === listItem.name);
    if(!foundItem) return false;
    foundItem.price = listItem.price;
    foundItem.bought = listItem.bought;
    repository.writeDatabase(listItems);  
    return true;
}
function deleteFromDatabase(listItem) {
    let listItems = repository.getDatabase();
    const previousSize = listItems.grocery_list.length;

    listItems.grocery_list = listItems.grocery_list.filter((item) => item.name !== listItem.name);
    repository.writeDatabase(listItems);  
    return previousSize > listItems.grocery_list;
}

const service = {
    get,
    add,
    update,
    deleteFromDatabase
};
module.exports = service;