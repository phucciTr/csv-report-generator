const path = require('path');
const fs = require('fs');

const FileHandler = {
  readFile: (name, callback) => {
    let filepath = path.join(__dirname, `./../db/uploads/${name}`);

    fs.readFile(filepath, (err, fileData) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, fileData, filepath);
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
          callback();
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
      fs.writeFile(counterPath, (Number(count) + 1).toString(), (err, newCount) => {
        cb(Number(count) + 1);
      });
    }
  });
};

module.exports = {
  FileHandler : FileHandler,
};