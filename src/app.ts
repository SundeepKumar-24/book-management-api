import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import bookRoutes from './routes/book.routes';
import errorHandler from './middlewares/errorHandler';

dotenv.config();

const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use('/books', bookRoutes);
app.use(errorHandler);

export default app;
