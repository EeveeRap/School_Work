(function () {
  "use strict";

  //strongly typed functions:
  function add(a: number, b: number) {
    return a + b;
  }

  function greeting(name: string) {
    return `Hello ${name}.`;
  }

  //Interface:
  interface Person {
    name: string;
    age: number;
  }

  //function using interface:
  function getPerson(person: Person) {
    return `My name is ${person.name}, and I'm ${person.age} years old.`;
  }

  //Using the functions:
  console.log(add(10, 23));

  
  console.log(greeting("volvi"));

  const volvi = {
    name: "Volvi Rapaport",
    age: 25,
  };

  console.log(getPerson(volvi));
})();


