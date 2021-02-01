const path = require('path');
const fs = require('fs');

let id = -1;

const FileHandler = {
  readFile: (name, upload, callback) => {
    let uploadPath = `./../db/uploads/${name}`;
    let csvPath = `./../db/csv/${name}`;

    let filename = upload ? path.join(__dirname, uploadPath) : path.join(__dirname + csvPath);

    fs.readFile(filename, (err, fileData) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, fileData);
      }
    });
  },

  writeFile: (file, callback) => {
    getUniqId((id) => {
      let filepath = path.join(__dirname, `./../db/csv/csv_${id}.csv`);

      fs.writeFile(filepath, file, (err) =>{
        if (err) {
          callback(err, null);
        } else {
          callback(null, id);
        }
      });
    });
  },

  deleteFile: (filepath, callback) => {
    if (fs.existsSync(filepath)) {
      fs.unlink(filepath, (err) => {
        if (err) {
          callback(err, null);
        } else {
          callback(null, `${filepath} removed`);
        }
      })
    }
  }
};

var getUniqId = (cb) => {
  let counterPath = path.join(__dirname, './../db/idCounter.txt');

  fs.readFile(counterPath, (err, count) => {
    if (err) {
      console.log('err');
    } else {
      fs.writeFile(counterPath, Number(count) + 1, (err, newCount) => {
        cb(Number(count) + 1);
      });
    }
  });
};

module.exports = {
  FileHandler : FileHandler,
  getUniqId : getUniqId
};