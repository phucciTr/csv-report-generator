const path = require('path');
const fs = require('fs');

let id = 0;

const readFile = (name, callback) => {
  let filename = path.join(__dirname, `./../uploads/${name}`);

  fs.readFile(filename, (err, fileData) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, fileData);
    }
  });

};

module.exports = {
  readFile : readFile
};