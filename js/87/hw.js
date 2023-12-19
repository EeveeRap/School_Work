(function () {
    "use strict";

    //Helper function to check if the name that's passed in is valid
    function nameValidation(name) {
        if (!name?.trim().length) {
            throw new Error(`${name} is not a valid first name.`);
        }
        return true;
    }

    class Person {

        #firstName;
        #lastName;
        #age;
        constructor(firstName, lastName, age) {
            //Making every input pass through the setters for validation
            this.first = firstName;
            this.last = lastName;
            this.age = age;
        }

        //Get and Set for firstName
        get first() {
            return this.#firstName;
        }

        set first(name) {
            if (nameValidation(name)) {
                this.#firstName = name;
            }

        }

        //Get and Set for lastName
        get last() {
            return this.#lastName;
        }

        set last(name) {
            if (nameValidation(name)) {
                this.#lastName = name;
            }

        }

        get age() {
            return this.#age;
        }

        set age(currentAge) {
            if (isNaN(currentAge) || currentAge <= 0 || currentAge > 120) {
                throw new Error(`${currentAge} is not a valid age. Please input an age between 1 and 120.`);
            }

            this.#age = currentAge;
        }

        toString() {

            let retVal = "";
           retVal = Object.entries(this).map(keyValue => `${keyValue[0]}: ${keyValue[1]}`).join(" ");

            return retVal;
        }

    }

    class Student extends Person {

        #grade;

        constructor(firstName, lastName, age, grade) {
            super(firstName, lastName, age);

            this.#grade = grade;
        }

        get grade() {
            return this.#grade;
        }

        set grade(currentGrade) {
            if (currentGrade < 0 || currentGrade > 100) {
                throw new Error(`${currentGrade} is not a valid grade. Please input an age between 0 and 100.`);
            }
            this.#grade = currentGrade;
        }


    }

    const p1 = new Person("Michael", "Rapaport", 25);
    p1.first = "Michael";
    p1.last = "Rapaport";
    p1.age = 25;
    p1.toString();

    const s1 = new Student("Bob", "Hardy", 32, 84);
    console.log(`I am ${s1}`);
}());