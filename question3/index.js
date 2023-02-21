


function inventoryList() {
    let inventory = [];

    const isInventoryExist = name => {
        // check if name exist in array
        return Boolean(inventory.filter(inventoryName => inventoryName.toLowerCase().trim() === name.toLowerCase().trim()).length)
    }

    return {
        add(inventoryName) {
            if (isInventoryExist(inventoryName) || inventory.length >= 10)
                return

            inventory.push(inventoryName)
        },
        remove(inventoryName) {
            // filer inventory and remove the parsed inventory
            inventory = inventory.filter(invent => invent.toLowerCase().trim() !== inventoryName.toLowerCase().trim())
        },
        getList() { return inventory }
    }
}


// Userage

// const inventory = inventoryList()

// inventory.add('Shirt')
// inventory.add('Trouser')
// inventory.remove('Shirt')
// console.log(inventory.getList())
