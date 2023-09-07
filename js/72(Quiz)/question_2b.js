window.app = window.app || {};
window.app.counterMaker = (function (theModule) {
    "use strict";
    
    let counterAmount = 0;

    function createCounter() {
        
        counterAmount++;
        let counter = 0;
        const counterId = counterAmount;

        return {
            increment: function () {
                counter++;
            },

            getCount: function() {
                console.log(`Counter #: ${counterId} Count: ${counter}`);
            },

        };
    }

   

    
    theModule.createCounter = createCounter;
    
    return theModule;

}(window.app.counterMaker || {}));