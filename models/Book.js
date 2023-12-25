const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Kitap adı boş bırakılamaz"],
        maxlength: [100, "Kitap adı en fazla 100 karakter olabilir"],
    },
    author: {
        type: String,
        required: [true, "Yazar adı boş bırakılamaz"],
        maxlength: [80, "Yazar adı en fazla 80 karakter olabilir"],
    },
    publishYear: {
        type: Number,
        min: [2000, "Yayın yılı en az 2000 olabilir"],
        max: [2023, "Yayın yılı en fazla 2023 olabilir"],
    },
    publisher: {
        type: String,
        required: [true, "Bir Şeyler Yanlış Lütfen Yayın Evini Boş Bırakmadığınızdan Emin Olun"],
        maxlength: [100, "Yayınevi en fazla 100 karakter olabilir"],
    },
    stock: {
        type: Number,
        required: [true, "Stok miktarı boş bırakılamaz"],
        min: [0, "Stok miktarı en az 0 olabilir"],
    },
    price: {
        type: Number,
        required: [true, "Fiyat boş bırakılamaz"],
        min: [5, "Fiyat en az 5 TL olabilir"],
    },
    barcode: {
        type: String,
        required: [true, "Barkod boş bırakılamaz"],
        unique: true,


},
    
promoters: {
    type: [String],
    required: [true, "Bir Şeyler Yanlış, Lütfen Destekleyicileri Boş Bırakmadığınızdan Emin Olun"],
    maxlength: [100, "Destekleyiciler en fazla 100 karakter olabilir"],
},




})


module.exports = mongoose.model('Book', bookSchema);