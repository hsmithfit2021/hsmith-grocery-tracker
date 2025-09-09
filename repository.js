const {DynamoDBClient} = require("@aws-sdk/client-dynamodb");
const {DynamoDBDocumentClient, GetCommand, PutCommand, DeleteCommand} = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({region: "us-east-2"});
const documentClient = DynamoDBDocumentClient.from(client);

const TableName = "grocery_list";

async function getItem(id) {
    const command = new GetCommand({
        TableName,
        Key: {id}
    });
    try {
        const data = await documentClient.send(command);
        return data.Item;
    }
    catch(error) {
        console.error(error);
        return null;
    }
}

async function addItem(item) {
    const command = new PutCommand({
        TableName,
        Item: item
    });
    try {
        await documentClient.send(command);
        return item;
    }
    catch(error) {
        return null;
    }
}

async function updateItem(item) {
    const command = new PutCommand({
        TableName,
        Item: item
    });
    try {
        await documentClient.send(command);
        return item;
    }
    catch(error) {
        return null;
    }
}

async function deleteItem(id) {
    const command = new DeleteCommand({
        TableName,
        Key: {id}
    });
    try {
        await documentClient.send(command);
        return true;
    }
    catch(error) {
        return null;
    }
}
const repository = {
    getItem,
    updateItem,
    addItem,
    deleteItem
};
module.exports = repository;