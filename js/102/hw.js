(function () {
  "use strict";
  //strongly typed functions:
  function add(a, b) {
    return a + b;
  }
  function greeting(name) {
    return "Hello ".concat(name, ".");
  }
  //function using interface:
  function getPerson(person) {
    return "My name is "
      .concat(person.name, ", and I'm ")
      .concat(person.age, " years old.");
  }
  //Using the functions:
  console.log(add(10, 23));
  console.log(greeting("volvi"));
  var volvi = {
    name: "Volvi Rapaport",
    age: 25,
  };
  console.log(getPerson(volvi));
})();
