const fs = require("fs");
const path = require("path");

exports.module = module.exports = function extFilter(
  directory,
  extension,
  callback
) {
  const ext = `.${extension}`;
  fs.readdir(directory, (err, files) => {
    if (err) {
      return callback(err);
    }
    callback(
      null,
      files.filter((f) => path.extname(f) === ext)
    );
  });
};
