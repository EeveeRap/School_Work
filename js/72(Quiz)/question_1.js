(function () {
    "use strict";


    function myMap(theArray, callbackFn) {
        const newArray = [];

        for (let index = 0; index < theArray.length; index++) {
            const result = callbackFn(theArray[index], index, theArray);
            newArray.push(result);
        }
        return newArray;
    }

    const array = [2, 4, 6, 8];

    //Using myMap:
    const mapArray = myMap(array, (x) => x * 2);

    console.log(array); //Output should be: Array [2, 4, 6, 8]
    console.log(mapArray); //Output should be: Array [4, 8, 12, 16]



}());

