const path = require('path');

const csvParser = (req, res, next) => {

  if (req.body.data) {
    let csv, table, html, parsedJSON;

    parsedJSON = JSON.parse(req.body.data);

    csv = createColsName(parsedJSON);
    csv = populateData(parsedJSON, csv);

    table = csv.split('\n');
    html = renderHeadersRow(table);
    html = renderCsvData(table, html);

    res.send(html);
  }
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
  let html = `<table><tr>`;
  let headers = table[0].split(',');

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
  csvParser : csvParser
};