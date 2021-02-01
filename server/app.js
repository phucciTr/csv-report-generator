const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const cors = require('cors');

const { csvConverter } = require('./controller/csvConverter');
const { FileHandler } = require('./model/fileHandler');
const upload = multer({ dest: './db/uploads'});

const app = express();
const port = 3000;
const path = require('path');

app.use(cors());
app.use('/', express.static(path.join(__dirname, './..public')));


app.post('/csv', upload.single('jsonForm'), csvConverter);

app.get('/download/:id', (req, res) => {
  let id = req.params.id;
  let filename = path.join(__dirname, `./db/csv/csv_${id}.csv`);

  res.download(filename, 'csv_report.csv', (err) => {
    if (err) {
      res.send('File not found');
      return err;
    }
    FileHandler.deleteFile(filename, () => {
      console.log(`csv_${id}.csv succesfully sent to client and removed from DB!`);
    });
  });
});

app.listen(port, () => {
  console.log(`Listening for request at http://localhost:${port}/`)
});