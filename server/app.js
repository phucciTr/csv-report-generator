const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const bodyParser = require('body-parser');
const { csvParser } = require('./middleware/csvParser');


app.use('/', express.static(path.join(__dirname, './..public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(csvParser);


app.get('/', (req, res) => {
  res.send('hello csv');
});

app.post('/csv', (req, res) => {
  // res.send('hello post csv');
});

app.listen(port, () => {
  console.log(`Listening for request at http://localhost:${port}/`)
});