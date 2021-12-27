import express from 'express';
import apiRouter from './routes/apiRouter';

const app = express();
app.use('/api', apiRouter);

export default app;
