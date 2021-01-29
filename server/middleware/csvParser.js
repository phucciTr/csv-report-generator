
const csvParser = (req, res, next) => {
  let parsedJSON = JSON.parse(req.body.data);


  let csv = createColsName(parsedJSON);
  csv = populateData(parsedJSON, csv);
  console.log(csv);
};


var createColsName = (data) => {
  let columns = Object.keys(data);

  return columns.filter((colName) => colName !== 'children').reduce((csv, col, index) => {
    return csv += (index !== (columns.length - 2)) ? `${col},` : `${col}\n`;
  }, '');
};

var populateData = (data, csv) => {

  for (let key in data) {
    let value = data[key];

    if (isPrimitive(value)) {
      csv += (key === 'sales') ? `${value}\n` : `${value},`;
    }

    if (isIterable(value)) {
      for (let obj of value) {
        csv = populateData(obj, csv);
      }
    }
  }

  return csv;
};

var isIterable = (value) => Array.isArray(value) && value.length > 0;
var isPrimitive = (value) => typeof value !== 'object';

module.exports = {
  csvParser : csvParser
};