import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import path from 'path';
import mongoose from 'mongoose';

require('dotenv').config();

mongoose.connect(process.env.DATABASE_URL);

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const router = express.Router();

const PORT = parseInt(process.env.PORT, 10) || 3000;

app.set('port', PORT);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`App started on port ${PORT}!`);
});
