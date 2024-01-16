const Book = require('../models/Book');

const getAllBooks = async (req, res) => {
    try {
        const { author, title, sort, fields, numericFilters } = req.query;
        const queryObj = {};

        // Regex işlemleri
        if (title) {
            queryObj.title = { $regex: title.replace(/[iıİ]/gi, '[ıIiİ]'), $options: 'i' };
        }

        if (author) {
            queryObj.author = { $regex: author.replace(/[iıİ]/gi, '[ıIiİ]'), $options: 'i' };
        }

        // Numeric filters işlemleri
        if (numericFilters) {
            const operatorMap = {
                ">": "$gt",
                ">=": "$gte",
                "=": "$eq",
                "!=": "$ne",
                "<": "$lt",
                "<=": "$lte",
            };
            const regexStr = /\b(<|>|>=|=|<|<=|!=)\b/g;
            let filters = numericFilters.replace(
                regexStr,
                (match) => `-${operatorMap[match]}-`,
            );
            const options = ["price", "stock", "edition"];

            filters = filters.split(",");

            for (const item of filters) {
                const [field, operator, value] = item.split("-");
                if (options.includes(field)) {
                    queryObj[field] = { [operator]: Number(value) };
                }
            }
        }

        console.log("şu ana kadar oluşan yeni query objemiz ", queryObj);

        // MongoDB sorgusunu oluşturun
        let result = Book.find(queryObj);

       
       
       

        if (sort) {
            const sortList = sort.split(",").join(" ");
            result = result.sort(sortList);
        } else {
            result = result.sort("createdAt");
        }
        
        
        if (fields) {
            const fieldsList = fields.split(",").join(" ");
            result = result.select(fieldsList);
        }
    
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 99;
        const skip = (page - 1) * limit;

        result = result.skip(skip).limit(limit);
        const books = await result;

        
        return res.status(200).json({ adet: books.length, data: books });
    } catch (error) {
        
        console.error('Error:', error);
        return res.status(500).json({ message: 'Dahili Sunucu Hatası!' });
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
        return res.status(200).send({ message: "Tüm kitaplar Başarıyla silindi", data: result });
    } catch (error) {
        console.error("Kitapları silme işlemi sırasında bir hata oluştu:", error);
        return res.status(500).send({ message: " Tüm Kitapları silme işlemi sırasında bir hata oluştu." });
    }
};

module.exports = {getAllBooks, getBook, addBook, updateBook, deleteBook, deleteAllBooks}
