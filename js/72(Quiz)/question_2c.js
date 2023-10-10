(function () {
    "use strict";

    /*global app*/

    //Incrementing the counter in first js file 10 times:
    for (let i = 0; i < 10; i++) {
        app.counter.increment();
    }

    //Creating 2 counters:
    const counter1 = app.counterMaker.createCounter();
    const counter2 = app.counterMaker.createCounter();

    //Incrementing the 1st counter in 2nd js file 5 times:
    for (let i = 0; i < 5; i++) {
        counter1.increment();
    }
    //Incrementing the 2nd counter in 2nd js file 15 times:
    for (let i = 0; i < 15; i++) {
        counter2.increment();
    }
    //Getting the final values of each counter:

    //Counter from first file:
    app.counter.getCount(); //Output should be 10

    //Counter #1 from second file:
    counter1.getCount(); //Output should be 5

    //Counter #2 from second file:
    counter2.getCount(); //Output should be 15
}());

// SL - grade - 100
