const path = require('path');

const csvParser = (req, res, next) => {

  let parsedJSON;

  if (req.body.data) {
    parsedJSON = JSON.parse(req.body.data);
    console.log('parsed req.body.data = ', parsedJSON);
    console.log('parsed req.body.data.children[0].children = ', parsedJSON.children[0].children);
    console.log('typeof parsed req.body.data = ', typeof parsedJSON);

    let csv = createColsName(parsedJSON);
    csv = populateData(parsedJSON, csv);

    // res.attachment(path.join(__dirname, 'test.txt'));
    // res.sendFile(path.join(__dirname, 'test.csv'));
    console.log(csv);

    let table = csv.split('\n');
    let colHeaders = table[0].split(',');

    let html = renderHeaders(colHeaders);
    // html = renderCsvData(table, html);

    console.log('table = ', table);
    // console.log('html = ', html);



    res.send(html);

  }

};

var renderCsvData = (data, html) => {

  html = data.reduce((html, value) => {

  }, html);
};

var renderHeaders = (headers) => {
  let html = `<table><tr>`;

  html = headers.reduce((html, header) => {
    return html += `<th scope="col">${header}</th>`
  }, html);

  html += `</tr></table>`
  return html;
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
      for (let obj of value) { csv = populateData(obj, csv); }
    }
  }

  return csv;
};

var isIterable = (value) => Array.isArray(value) && value.length > 0;
var isPrimitive = (value) => typeof value !== 'object';

module.exports = {
  csvParser : csvParser
};