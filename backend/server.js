import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import { readFile } from 'fs/promises';
import connectDb from './config/dbConfig.js';
import assetsRoutes from './routes/assetsRoutes.js';

const app = express();
dotenv.config();
connectDb();

app.get('/', (req, res) => {
  res.send('APIs are running');
});

app.use('/api/assets', assetsRoutes);

const PORT = process.env.PORT;

app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on ${PORT}!`.cyan
      .underline
  )
);
