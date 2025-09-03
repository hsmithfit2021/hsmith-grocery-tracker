const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin, // Read from standard input (keyboard)
  output: process.stdout // Write to standard output (console)
});

rl.once('close', () => {
     // end of input
     console.log("Goodbye");
 });


let items = [];
selectMenuOption();

function selectMenuOption() {
    rl.question("0. Exit\n1. Display Grocery List\n2. Add Item\n3. Remove Item\n4. Set Bought\nSelect an option [0-4]: ", (input) => {
        switch(input) {
            case "0":
                rl.close();
                return;

            case "1":
                displayGroceryList();
                break;

            case "2":
                addNewItem();
                break;

            case "3":
                removeItem();
                break;

            case "4":
                setItemBought();
                break;

            default:
                console.log("Unknown Command");

        }
        
    });
}

function displayGroceryList() {
    items.forEach((item, i) => console.log(`${i}: Name - ${item.name} Number - ${item.quantity} Price - $${item.price} Bought - ${item.isBought}`));
    selectMenuOption();
}

function addNewItem() {
    const item = {};
    rl.question("Enter item name: ", ((itemName) => {
        item.name = itemName;
        rl.question("Enter item quantity: ", ((itemQuantity) => {
            item.quantity = Number(itemQuantity);
            rl.question("Enter item price: ", ((itemPrice) => {
                item.price = Number(itemPrice).toFixed(2);
                rl.question("Is item bought? (y/n): ", ((itemBought) => {
                    item.isBought = itemBought === 'y';
                    items.push(item);
                    selectMenuOption();
                })) 
            }))
        }))
    }));
}

function removeItem() {
    rl.question(`Enter an item index [0-${items.length-1}]: `, (index) => {
        if(index < 0 || index >= items.length) {
            console.log("Invalid index");
        }
        else {
            items = items.filter((item) => item != items[index]);
            console.log(`Deleted item #${index}.`);
        }
        selectMenuOption();
    });
}

function setItemBought() {
    rl.question(`Enter an item index [0-${items.length-1}]: `, (index) => {
        if(index < 0 || index >= items.length) {
            console.log("Invalid index");
        }
        else {
            items[index].isBought = true;
            console.log(`Set item #${index} as bought.`);
        }
        selectMenuOption();
    });
}
