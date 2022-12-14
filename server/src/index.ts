import express from 'express';
import path from 'node:path';
import mongoose from 'mongoose';
import { router } from './router';

mongoose
  .connect('mongodb://localhost:27017')
  .then(() => {
    const app = express();
    const port = 3001;

    app.use((_, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', '*');
      res.setHeader('Access-Control-Allow-Headers', '*');

      next();
    });
    app.use(
      '/uploads',
      express.static(path.resolve(__dirname, '..', 'uploads')),
    );
    app.use(express.json());
    app.use(router);

    app.listen(port, () => {
      console.log('running server on http://localhost:3001');
    });
  })
  .catch(() => console.log('error on connect db'));
