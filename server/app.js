const express = require('express');
const multer = require('multer');
const upload = multer({ dest: './db/uploads'});

const app = express();
const port = 3000;
const path = require('path');
const bodyParser = require('body-parser');
const { csvParser } = require('./controller/csvParser');
const cors = require('cors');

app.use(cors());
app.use('/', express.static(path.join(__dirname, './..public')));

app.post('/csv', upload.single('jsonForm'), csvParser);

app.get('/download/:id', (req, res) => {
  let id = req.params.id;
  let filename = path.join(__dirname, `./db/csv/csv_${id}.csv`);
  res.download(filename, 'report.csv');
});

app.listen(port, () => {
  console.log(`Listening for request at http://localhost:${port}/`)
});