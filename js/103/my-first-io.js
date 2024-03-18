const fs = require("fs");

const content = fs.readFileSync(process.argv[2], "utf-8");
const lines = content.split("\n").length;
console.log(lines -1);
