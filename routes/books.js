// routes/books.js

const express = require('express');
const router = express.Router();
const {getAllBooks, getBook, addBook, updateBook, deleteBook, deleteAllBooks} = require('../controllers/books');
const Book = require('../models/Book'); // Book modelini ekledik, bu kısmı kendi modelinizle değiştirmelisiniz

router.route('/').get(getAllBooks).post(addBook).delete(deleteAllBooks).patch(updateBook).delete(deleteBook);
router.route('/:id').get(getBook);
router.route('/delete-all').delete(deleteAllBooks);

module.exports = router;
