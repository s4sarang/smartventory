import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import { readFile } from 'fs/promises';
import connectDb from './config/dbConfig.js';
const assets = JSON.parse(
  await readFile(new URL('./data/assets.json', import.meta.url))
);

const app = express();
dotenv.config();
connectDb();

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

const PORT = process.env.PORT;

app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on ${PORT}!`.cyan
      .underline
  )
);
