import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import { readFile } from 'fs/promises';
import connectDb from './config/dbConfig.js';
import assetsRoutes from './routes/assetsRoutes.js';
import usersRoutes from './routes/usersRoutes.js';
import ordersRoutes from './routes/ordersRoute.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

const app = express();
dotenv.config();
connectDb();

app.get('/', (req, res) => {
  res.send('APIs are running');
});

app.use(express.json());

app.use('/api/users', usersRoutes);
app.use('/api/assets', assetsRoutes);
app.use('/api/orders', ordersRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT;

app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on ${PORT}!`.cyan
      .underline
  )
);
