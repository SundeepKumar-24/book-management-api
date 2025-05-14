import express from 'express';
import multer from 'multer';
import * as controller from '../controllers/book.controller';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.get('/books', controller.getAllBooks);
router.get('/books/:id', controller.getBook);
router.post('/books', controller.createBook);
router.put('/books/:id', controller.updateBook);
router.delete('/books/:id', controller.deleteBook);
router.post('/books/import', upload.single('file'), controller.importBooks);

export default router;
