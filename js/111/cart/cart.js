module.exports = class Cart {
    constructor(items) {
        this.items = items || {};
    }

    addItem(id, orderQuantity) {
        let cartQuantity = this.items[id] || 0;
        this.items[id] = cartQuantity + Number(orderQuantity);
    }
};