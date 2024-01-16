const express = require('express');
require('express-async-errors');
const app = express();
const connect = require('./db/connect_mongoose');
const books = require('./routes/books');
const notFound = require('./middleware/not-found');
const errorHandler = require('./middleware/error-handler');
const Book = require('./models/Book'); // Kitap modelini ekleyin

require('dotenv').config();

const port = process.env.PORT || 3000;

// middleware
app.use(express.json());
app.use('/api/v1/books', books);
app.use(errorHandler);
app.use(notFound);

// Yeni endpoint
app.delete('/api/v1/books', async (req, res) => {
    try {
        const result = await Book.deleteMany({});
        res.status(200).send({ message: "Tüm kitaplar silindi", data: result });
    } catch (error) {
        console.error("Kitapları silme işlemi sırasında bir hata oluştu:", error);
        res.status(500).send({ message: "Kitapları silme işlemi sırasında bir hata oluştu." });
    }
});

const start = async () => {
    try {
        await connect(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log("1...2...3...Sunucu Alev Aldı..🔥🔥🔥" + port);
        });
    } catch (error) {
        console.error(error);
    }
}

start();
