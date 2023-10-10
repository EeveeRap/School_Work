window.app = window.app || {};
window.app.counter = (function () {
    "use strict";

    let counter = 0;

    function increment(){
        counter++;
    }

    // SL - getCount should return the count. Who says caller wants to log it out?
    function getCount(){
        return console.log(`Counter: ${counter}`);
    }

    return {
        increment,
        getCount
    };

}());

// SL - nice!
