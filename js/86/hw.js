(function () {
    "use strict";

    class Vehicle {

        constructor(color) {
            this.color = color;
        }

        go(speed) {
            this.speed = speed;
            console.log(`Now going at speed: ${speed}`);
        }

        print() {
            console.log(`Current color is: ${this.color}, Current speed is: ${this.speed}.`);
        }
    }

    class Plane extends Vehicle {

        constructor(color) {
            super(color);
        }

        go(speed) {
            this.speed = speed;
            console.log(`Now FLYING at speed: ${speed}.`);
        }
    }

    const v1 = new Vehicle("Green");
    v1.go("60 MPH");
    v1.print();

    const p1 = new Plane("Yellow");
    p1.go("300 MPH");
    p1.print();
    console.log(v1, p1);

}());