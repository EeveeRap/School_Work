"use strict";
//Company function:
function createCompany(name, address, numOfEmployees) {
    return {
        name: name,
        address: address,
        numOfEmployees: numOfEmployees,
        employees: [],
        addEmployee: function (name, dept) {
            const employee = { name, dept };
            this.employees.push(employee);
            //console.log(this.employees); 

        },
        print: printCompany

    };
}

function printCompany() {
    console.log(`Company Name: ${this.name}\nAddress: ${this.address}\nEmployees: `);
    for (let i = 0; i < this.employees.length; i++) {
        const employee = this.employees[i];
        console.log(`Name: ${employee.name}, Dept: ${employee.dept}`);
    }
}
//Creating company #1
const company1 = createCompany("Razor Solutions", "101 Green Ave", 3);
company1.addEmployee("Jim Hathaway", "CEO", 54);
company1.addEmployee("Jack Winslow", "CFO", 42);
company1.addEmployee("Joe Delgado", "COO", 37);
company1.print();

//Creating company #2
const company2 = createCompany("Walmart", "843 Ocean Dr", 3);
company2.addEmployee("Bill Harley", "Salesman", 24);
company2.addEmployee("Daniel Ryder", "HR", 30);
company2.addEmployee("Mitchell Cross", "Manager", 37);
company2.print();

//Creating company #3
const company3 = createCompany("Amazon", "934 Hooper Blvd", 3);
company3.addEmployee("Michael Connelly", "CEO", 49);
company3.addEmployee("Harry Houdini", "CFO", 38);
company3.addEmployee("Alex Boyd", "COO", 42);
company3.print();