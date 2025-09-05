const service = require("../service.js");
const repository = require("../repository.js");

test("Get", () => {
    const spyRead = jest.spyOn(repository, 'getDatabase');
    spyRead.mockImplementation(() => {return;})

    service.get();
    
    expect(spyRead).toHaveBeenCalledTimes(1);

    spyRead.mockClear();
});

test("Add", () => {
    const spyRead = jest.spyOn(repository, 'getDatabase');
    spyRead.mockImplementation(() => {
        return {
            grocery_list: []
        };
    })

    const spyWrite = jest.spyOn(repository, 'writeDatabase');
    spyWrite.mockImplementation((listItems) => {return;})

    let listItem = {name: "Pineapple", price: 4.50, bought: false};

    const actual = service.add(listItem);

    expect(actual).toBeTruthy();
    expect(spyRead).toHaveBeenCalledTimes(1);
    expect(spyWrite).toHaveBeenCalledTimes(1);

    spyRead.mockClear();
    spyWrite.mockClear();
});

test("Update", () => {
    const spyRead = jest.spyOn(repository, 'getDatabase');
    spyRead.mockImplementation(() => {
        return {
            grocery_list: [{name: "Pineapple", price: 4.50, bought: false}]
        };
    })

    const spyWrite = jest.spyOn(repository, 'writeDatabase');
    spyWrite.mockImplementation((listItems) => {return;})

    let listItem = {name: "Pineapple", price: 4.50, bought: true};

    const actual = service.update(listItem);

    expect(actual).toBeTruthy();
    expect(spyRead).toHaveBeenCalledTimes(1);
    expect(spyWrite).toHaveBeenCalledTimes(1);

    spyRead.mockClear();
    spyWrite.mockClear();
});

test("Update Item not found", () => {
    const spyRead = jest.spyOn(repository, 'getDatabase');
    spyRead.mockImplementation(() => {
        return {
            grocery_list: []
        };
    })

    const spyWrite = jest.spyOn(repository, 'writeDatabase');
    spyWrite.mockImplementation((listItems) => {return;})

    let listItem = {name: "Pineapple", price: 4.50, bought: true};

    const actual = service.update(listItem);

    expect(actual).toBeFalsy();
    expect(spyRead).toHaveBeenCalledTimes(1);
    expect(spyWrite).toHaveBeenCalledTimes(0);

    spyRead.mockClear();
    spyWrite.mockClear();
});

test("Delete", () => {
    const spyRead = jest.spyOn(repository, 'getDatabase');
    spyRead.mockImplementation(() => {
        return {
            grocery_list: [{name: "Pineapple", price: 4.50, bought: true}]
        };
    })

    const spyWrite = jest.spyOn(repository, 'writeDatabase');
    spyWrite.mockImplementation((listItems) => {return;})

    let listItem = {name: "Pineapple", price: 4.50, bought: true};

    const actual = service.deleteFromDatabase(listItem);

    expect(actual).toBeTruthy();
    expect(spyRead).toHaveBeenCalledTimes(1);
    expect(spyWrite).toHaveBeenCalledTimes(1);

    spyRead.mockClear();
    spyWrite.mockClear();
});

test("Delete", () => {
    const spyRead = jest.spyOn(repository, 'getDatabase');
    spyRead.mockImplementation(() => {
        return {
            grocery_list: []
        };
    })

    const spyWrite = jest.spyOn(repository, 'writeDatabase');
    spyWrite.mockImplementation((listItems) => {return;})

    let listItem = {name: "Pineapple", price: 4.50, bought: true};

    const actual = service.deleteFromDatabase(listItem);

    expect(actual).toBeFalsy();
    expect(spyRead).toHaveBeenCalledTimes(1);
    expect(spyWrite).toHaveBeenCalledTimes(1);

    spyRead.mockClear();
    spyWrite.mockClear();
});