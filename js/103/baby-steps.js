let consoleArgs = process.argv;
let sum = 0;
for(let i = 2; i < consoleArgs.length; i++){
    sum += Number(consoleArgs[i]);
}
console.log(sum);