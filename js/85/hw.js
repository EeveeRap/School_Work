(function () {
    "use strict";

    // Question #1:
    function Vehicle(color) {
        this.color = color;
        this.speed = 0;
    }
    Vehicle.prototype.go = function (speed) {
        this.speed = speed;
        console.log(`Now going at speed ${speed}`);
    };

    Vehicle.prototype.print = function () {
        console.log(`Vehicle color: ${this.color}, Current speed ${this.speed}`);
    };

    const v1 = new Vehicle("Red");
    v1.go("65 MPH");
    v1.print();

    // Question #2:
    function Plane(color) {
        // Calling the parent constructor:
        Vehicle.call(this, color);
    }
    // Setting up prototype chain:
    Plane.prototype = Object.create(Vehicle.prototype);
    Plane.prototype.constructor = Plane;

    Plane.prototype.go = function (speed) {
        this.speed = speed;
        console.log(`Now FLYING at speed ${speed}`);
    };

    const p1 = new Plane("White");
    p1.go("170 MPH");
    p1.print();
    console.log(v1, p1);


}());