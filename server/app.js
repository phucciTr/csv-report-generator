const express = require('express');
var multer = require('multer');
var upload = multer({ dest: './uploads'});

const app = express();
const port = 3000;
const path = require('path');
const bodyParser = require('body-parser');
const { csvParser } = require('./controller/csvParser');
const cors = require('cors');

app.use(cors());
app.use('/', express.static(path.join(__dirname, './..public')));

app.get('/', (req, res) => {
  res.send('hello csv');
});

app.post('/csv', upload.single('jsonForm'), csvParser);

app.listen(port, () => {
  console.log(`Listening for request at http://localhost:${port}/`)
});