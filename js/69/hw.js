const interestCalculator = (function () {
    "use strict";
    let rate;
    let years;

    function calculateInterest(principal) {

        let totalInterest = (principal * rate) * years;
        return {
            totalInterest
        };
    }

    function setRate(newRate) {
        rate = newRate;
    }

    function setYears(newYears) {
        years = newYears;
    }

    return {
        calculateInterest,
        setRate,
        setYears
    };
}());

//Only shows the object with its three functions:
console.log(interestCalculator);

interestCalculator.setRate(0.1);
interestCalculator.setYears(2);

//Expected output should be totalInterest: 20
console.log(interestCalculator.calculateInterest(100));


//Question 2a:
const bankAccounts = (function () {
    "use strict";

    const account1 = {
        balance: 0,

        performTransaction(amount) {
            let transaction = Math.sign(amount);
            if (transaction === 1) {
                console.log(`Account 1: ${amount} Deposited`);
            }
            else if (transaction === -1) {
                console.log(`Account 1: ${amount} Withdrawn`);
            }

            this.balance += amount;
        }

    };

    const account2 = {
        balance: 0,

        performTransaction(amount) {
            let transaction = Math.sign(amount);
            if (transaction === 1) {
                console.log(`Account 2: ${amount} Deposited`);
            }
            else if (transaction === -1) {
                console.log(`Account 2: ${amount} Withdrawn`);
            }

            this.balance += amount;
        }


    };

    function transactionFunc(amount) {
        let transaction = Math.sign(amount);
        if (transaction === 1) {
            console.log(`${amount} Deposited`);
        }
        else if (transaction === -1) {
            console.log(`${amount} Withdrawn`);
        }

        this.balance += amount;

    }

    return {
        account1,
        account2,
        transactionFunc
    };


}());

//Depositing & Withdrawing from account1:
bankAccounts.account1.performTransaction(10);
bankAccounts.account1.performTransaction(-5);
console.log(bankAccounts.account1); //Output should be 5

//Depositing & Withdrawing from account2:
bankAccounts.account2.performTransaction(20);
bankAccounts.account2.performTransaction(-10);
console.log(bankAccounts.account2); //Output should be 10

//Using call:
bankAccounts.transactionFunc.call(bankAccounts.account1, 100);
console.log(bankAccounts.account1); //Output should be 105

//Using apply:
bankAccounts.transactionFunc.apply(bankAccounts.account2, [100]);
console.log(bankAccounts.account2); //Output should be 110

//Question 2c:
const depositFiftyInAccount1 = bankAccounts.transactionFunc.bind(bankAccounts.account1, 50);
depositFiftyInAccount1();
console.log(bankAccounts.account1); //Output should be 155
