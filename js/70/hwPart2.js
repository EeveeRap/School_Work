window.myApp = window.myApp || {};

window.myApp.utils = (function (newModule) {
    "use strict";

    function stringCaseInsensitiveEquals(string1, string2) {
        return string1.toUpperCase() === string2.toUpperCase();
    }

    //Assigning the function to a property within newModule:
    newModule.stringCaseInsensitiveEquals = stringCaseInsensitiveEquals;

    return newModule;

}(window.myApp.utils || {}));
