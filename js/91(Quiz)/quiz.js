(function () {
    "use strict";

    const orderInput = document.querySelector("#orderInput");
    const loadButton = document.querySelector("#loadButton");
    const outputDiv = document.querySelector("#output");

    class Item {
        #name;
        #price;
        #quantity;

        constructor(name, price, quantity) {
            this.#name = name;
            this.#price = price;
            this.#quantity = quantity;
        }

        get name() {
            return this.#name;
        }

        get price() {
            return this.#price;
        }

        get quantity() {
            return this.#quantity;
        }

    }

    class Order {
        #customerName;
        #customerAddr;
        #items = [];

        constructor(customerName, customerAddr, items) {
            this.#customerName = customerName;
            this.#customerAddr = customerAddr;
            this.#items = items;
        }

        get totalCost() {
            let total = 0;

            for (const item of this.#items) {
                total += item.price * item.quantity;
            }
            return total;
        }
    }

    async function loadOrder() {
        try {
            const response = await fetch(`${orderInput.value}`);
            if (!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`);
            }
            return await response.json();
        } catch (e) {

            console.error(e);
        }
    }

    async function displayOrder() {
        const theOrder = await loadOrder();
        theOrder.forEach(order => {
            console.log(order);

            const name = order.customer;
            const address = order.address;
            const items = order.items;

            const currentItem = items.map(item => new Item(item.item, item.quantity, item.total / item.quantity));
            const currentOrder = new Order(name, address, currentItem);

            console.log(currentOrder.totalCost);
            const orderOutput = document.createElement("div");


            orderOutput.innerHTML = `<div>
                <hr>
                Customer: ${name} <br>
                Address: ${address}<br>
                Total: ${currentOrder.totalCost.toFixed(2)}<br>
                <br>
                Items: <br>
                 ${items.map(item => `Item: ${item.item} <br> Quantity: ${item.quantity} <br> Price: ${(item.total / item.quantity).toFixed(2)}`).join("<br><br>")}
                  </div>`;
            outputDiv.appendChild(orderOutput);
        });
    }

    loadButton.addEventListener("click", async () => {
        await displayOrder();
    });
}());