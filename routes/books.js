// routes/books.js

const express = require('express');
const router = express.Router();
const { getAllBooks, addBook, deleteAllBooks } = require('../controllers/books');

router.route('/').get(getAllBooks).post(addBook).delete(deleteAllBooks);

module.exports = router;
