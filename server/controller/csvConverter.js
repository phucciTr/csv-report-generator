const path = require('path');
const { FileHandler } = require('./../model/fileHandler');

const csvConverter = (req, res, next) => {
  let csvText, table, html, parsedJSON;
  let filename = req.file ? req.file.filename : undefined;

  FileHandler.readFile(filename, (err, fileData, filePath) => {
    if (err) {
      console.log('err = ', err);
      res.sendStatus(400);
      return err;
    }

    parsedJSON = JSON.parse(fileData.toString());
    csvText = createCsvText(parsedJSON);

    FileHandler.writeFile(csvText, (err, id) => {
      FileHandler.deleteFile(filePath, () => {

        table = csvText.split('\n');
        html = renderHeadersRow(table);
        html = renderCsvData(table, html);

        res.send([html, id]);
      });
    });
  });

};

var createCsvText = (data) => {
  let csv = createColsName(data);
  return csv = populateData(data, csv);
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

var renderHeadersRow = (table) => {
  let headers = table[0].split(',');
  let html = `<table><tr>`;

  html = headers.reduce((html, header) => {
    return html += `<th scope="col">${header}</th>`;
  }, html);

  html += `</tr>`;
  return html;
};


var renderCsvData = (rows, html) => {
  rows.forEach((row, index) => {
    if (hasData(row, index)) {
      html += `<tr>`;

      html = row.split(',').reduce((html, value) => {
        return html += `<td>${value}</td>`;
      }, html);

      html += `</tr>`;
    }
  });
  html += `</table>`;
  return html
};


var isIterable = (value) => Array.isArray(value) && value.length > 0;
var isPrimitive = (value) => typeof value !== 'object';
var hasData = (row, index) => index > 0 && row !== '';


module.exports = {
  csvConverter : csvConverter
};