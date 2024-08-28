import express, { Express } from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import rootRouter from './routes/rootRoute';

dotenv.config();

const app: Express = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api', rootRouter);

export default app;
