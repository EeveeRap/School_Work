window.app = window.app || {};
window.app.counter = (function () {
    "use strict";

    let counter = 0;

    function increment(){        
        counter++;
    }

    function getCount(){
        return console.log(`Counter: ${counter}`);
    }

    return {
        increment,
        getCount
    };

}());


