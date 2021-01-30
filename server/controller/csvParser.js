const path = require('path');
const { readFile } = require('./fileReader');

const csvParser = (req, res, next) => {

  let filename = req.file ? req.file.filename : undefined;

  readFile(filename, (err, fileData) => {
    if (err) {
      console.log('err = ', err);
      res.sendStatus(400);
      return err;
    }

    let csv, table, html, parsedJSON;
    parsedJSON = JSON.parse(fileData.toString());

    csv = createColsName(parsedJSON);
    csv = populateData(parsedJSON, csv);

    table = csv.split('\n');
    html = renderHeadersRow(table);
    html = renderCsvData(table, html);

    res.send(html);
  });

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
  let html = form;
  html += `<table><tr>`;

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

var form = `<form action="http://localhost:3000/csv" method="post" id="json" enctype="multipart/form-data">
<label for="json">Enter JSON:</label>
<input type="file" id="json" name="json">
<input type="submit" value="Submit JSON">
</form>`

module.exports = {
  csvParser : csvParser
};