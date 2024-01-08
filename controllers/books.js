const Book = require('../models/Book');

const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find({});
        return res.status(200).send({ data: books });
    } catch (error) {
        console.error("Kitapları getirme işlemi sırasında bir hata oluştu:", error);
        return res.status(500).send({ message: "Kitapları getirme işlemi sırasında bir hata oluştu." });
    }
};

const getBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).send({ message: "Kitap bulunamadı" });
        }
        return res.status(200).send({ data: book });
    } catch (error) {
        console.error("Kitap getirme işlemi sırasında bir hata oluştu:", error);
        return res.status(500).send({ message: "Kitap getirme işlemi sırasında bir hata oluştu." });
    }
};

const addBook = async (req, res) => {
    try {
        const book = new Book(req.body);
        const result = await book.save();
        return res.status(201).send({ message: "Kitap başarıyla eklendi", data: result });
    } catch (error) {
        console.error("Kitap ekleme işlemi sırasında bir hata oluştu:", error);
        return res.status(500).send({ message: "Kitap ekleme işlemi sırasında bir hata oluştu." });
    }
};

const updateBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!book) {
            return res.status(404).send({ message: "Kitap bulunamadı" });
        }
        return res.status(200).send({ message: "Kitap başarıyla güncellendi", data: book });
    } catch (error) {
        console.error("Kitap güncelleme işlemi sırasında bir hata oluştu:", error);
        return res.status(500).send({ message: "Kitap güncelleme işlemi sırasında bir hata oluştu." });
    }
};

const deleteBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndRemove(req.params.id);
        if (!book) {
            return res.status(404).send({ message: "Kitap bulunamadı" });
        }
        return res.status(200).send({ message: "Kitap başarıyla silindi", data: book });
    } catch (error) {
        console.error("Kitap silme işlemi sırasında bir hata oluştu:", error);
        return res.status(500).send({ message: "Kitap silme işlemi sırasında bir hata oluştu." });
    }
};

const deleteAllBooks = async (req, res) => {
    try {
        const result = await Book.deleteMany({});
        return res.status(200).send({ message: "Tüm kitaplar silindi", data: result });
    } catch (error) {
        console.error("Kitapları silme işlemi sırasında bir hata oluştu:", error);
        return res.status(500).send({ message: "Kitapları silme işlemi sırasında bir hata oluştu." });
    }
};

module.exports = { getAllBooks, getBook, addBook, updateBook, deleteBook, deleteAllBooks };
