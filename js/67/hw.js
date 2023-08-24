"use strict";
const letters = ["a", "B", "c"];
const letters2 = ["a", "b", "c"];
const letters3 = ["A", "b", "C", "d", "E"];

//Every function:
function ourEvery(theArray, callbackFn) {
    for (const element of theArray) {
        if (!callbackFn(element)) {
            return false;
        }
    }
    return true;
}
function isCaps(char) {
    return char === char.toUpperCase();
}

function isNotCaps(char) {
    return char === char.toLowerCase();
}
//calling ourEvery
let hasCaps = ourEvery(letters, isCaps);
console.log("Uppercase? " + hasCaps); //output should be "false"

hasCaps = ourEvery(letters2, isCaps);
console.log("Uppercase? " + hasCaps); //output should be "false"

const noCaps = ourEvery(letters2, isNotCaps);
console.log("Uppercase? " + noCaps); //output should be "true"



//calling built in .every
console.log(letters.every(isCaps)); //output should be "false"
console.log(letters2.every(isCaps)); //output should be "false"

//Some function:
function ourSome(theArray, callbackFn) {
    for (const element of theArray) {
        if (callbackFn(element)) {
            return true;
        }
    }
    return false;
}

//calling ourSome
hasCaps = ourSome(letters, isCaps);
console.log("Uppercase? " + hasCaps); //output should be "true"

hasCaps = ourSome(letters2, isCaps);
console.log("Uppercase? " + hasCaps); //output should be "false"

//calling built in .some
console.log(letters.some(isCaps)); //output should be "true"
console.log(letters2.every(isCaps)); //output should be "false"

//onlyIf function:
function onlyIf(theArray, testCallbackFn, actionCallbackFn) {
    for (let i = 0; i < theArray.length; i++) {
        if (testCallbackFn(theArray[i])) {
            actionCallbackFn(theArray[i]);
        }
    }

}
const printIt = x => console.log(x);

//calling onlyIf:
onlyIf(letters, isCaps, printIt); //output should be "B"
onlyIf(letters2, isCaps, printIt);//no output

//onlyIf with built in operators:
const filteredArray = letters3.filter(isCaps);
filteredArray.forEach(printIt); //output should be "A, C, E"
