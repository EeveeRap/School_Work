//"use strict";

const fs = require("fs");

fs.readFile(process.argv[2], "utf-8", (err, data) => {
  if (err) {
    return console.error(err);
  }
  const numberOfLines = data.split("\n").length;
  console.log(numberOfLines - 1);
});
