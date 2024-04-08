//"use strict";

const fs = require("fs");
const path = require("path");
const ext = `.${process.argv[3]}`;

fs.readdir(process.argv[2], (err, list) => {
  if (err) {
    return console.error(err);
  }
  list.forEach((file) => {
    if (path.extname(file) === ext) {
      console.log(file);
    }
  });
});
