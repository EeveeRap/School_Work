window.myApp = window.myApp || {};

window.myApp.utils = (function (monthModule) {
    "use strict";

    const months = ["January", "February", "March", "April", "May", "June", "July", "August",
        "September", "October", "November", "December"];

    function getMonthName(index) {
        return months[index - 1];
    }

    function getMonthIndex(month) {
        for (let i = 0; i < months.length; i++) {
            if (months[i] === month) {
                return i + 1;
            }
        }
    }

    monthModule.getMonth = getMonthName;
    monthModule.getMonthIndex = getMonthIndex;

    return monthModule;

}(window.myApp.utils || {}));
/*global myApp*/
console.log(myApp.utils.getMonthName(4)); //Output should be "April"
console.log(myApp.utils.getMonthIndex("April")); //Output should be 4


