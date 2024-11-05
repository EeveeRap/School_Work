const dbItems = require('./items.js');
module.exports = class Cart {
    constructor(items) {
        this.items = items || {};
    }

    addItem(id, orderQuantity) {
        let cartQuantity = this.items[id] || 0;
        this.items[id] = cartQuantity + Number(orderQuantity);
        console.log('addItems - cart items is', this.items);
    }

    getItems() {
        const items = [];
        
        for( const[key, value] of Object.entries(this.items)){
            items.push({
                item: dbItems.find(i => i.id === Number(key)),
                quantity: value
            });
        }

        return items;
    }
};