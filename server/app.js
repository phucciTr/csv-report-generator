const express = require('express');
const app = express();
const port = 3000;

app.use('/', express.static('public'));

app.get('/', (req, res) => {
  res.send('hello csv');
});

app.post('/', (req, res) => {
  res.send('hello post csv');
});

app.listen(port, () => {
  console.log(`Listening for request at http://localhost:${port}`)
});