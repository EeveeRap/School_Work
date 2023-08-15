"use strict";

//Functions:
function CelsiusToFarenheit(temp) {
    let result = (temp / 5) * 9 + 32;
    console.log(parseFloat(result.toFixed(1)));
    return parseFloat(result.toFixed(1));
}

function FarenheitToCelsius(temp) {
    let result = (temp - 32) * 5 / 9;
    console.log(parseFloat(result.toFixed(1)));
    return parseFloat(result.toFixed(1));
}

//Calling Function #1:
CelsiusToFarenheit(10);
CelsiusToFarenheit(20);
CelsiusToFarenheit(30);
CelsiusToFarenheit(40);

//Calling Function #2:
FarenheitToCelsius(50);
FarenheitToCelsius(68);
FarenheitToCelsius(86);
FarenheitToCelsius(104);

//Prompts:
let inputTempCelsius = prompt("Provide a Temperature in Celsius");
alert("Farenheit temp is: " + CelsiusToFarenheit(inputTempCelsius));

let inputTempFarenheit = prompt("Provide a Temperature in Farenheit");
alert("Celsius temp is: " + FarenheitToCelsius(inputTempFarenheit));
