import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import bookRoutes from './routes/book.routes';
import errorHandler from './middlewares/errorHandler';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(express.json());

// ✅ Add root route
app.get('/', (req, res) => {
  res.send('Welcome to the Book Management API');
});

app.use('/api', bookRoutes);

// Error handler
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
