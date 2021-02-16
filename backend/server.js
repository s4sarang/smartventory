const express = require('express');
const assets = require('./data/assets.json');

const app = express();

app.get('/', (req, res) => {
  res.send('APIs are running');
});

app.get('/api/assets', (req, res) => {
  res.send(assets);
});

app.get('/api/assets/:dlink', (req, res) => {
  const asset = assets.find((asset) => asset.link === req.params.dlink);
  res.send(asset);
});

app.listen(5000, console.log('Hello World!'));
