const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Kitap adını boş bırakmayınız. Lütfen tekrar deneyin."],
        maxlength: [100, "Kitap adı en fazla 100 karakter olabilir"],
    },
    author: {
        type: String,
        required: [true, "Yazarı boş bırakmayınız. Lütfen tekrar deneyin."],
        maxlength: [80, "Yazar adı en fazla 80 karakter olabilir"],
    },
    publishYear: {
        type: Number,
        required: [true, "Yayın yılını boş bırakmayınız. Lütfen tekrar deneyin."],
        min: [2000, "Yayın yılı en az 2000 olabilir"],
        max: [2023, "Yayın yılı en fazla 2023 olabilir"],
    },
    publisher: {
        type: String,
        required: [true, "Yayın evini boş bırakmayınız. Lütfen tekrar deneyin."],
        maxlength: [100, "Yayınevi en fazla 100 karakter olabilir"],
    },
    stock: {
        type: Number,
        required: [true, "Stok miktarını boş bırakmayınız. Lütfen tekrar deneyin."],
        min: [0, "Stok miktarı en az 0 olabilir"],
    },
    price: {
        type: Number,
        required: [true, "Fiyat miktarını boş bırakmayınız. Lütfen tekrar deneyin."],
        min: [5, "Fiyat miktarı en az 5 TL olabilir"],
    },
    //barkod
    barcode: {
        type: String,
        required: [true, "Barkodu boş bırakmayınız."],
        unique: true,
    },
    //destekleyiciler
    promoters: {
        type: [String],
        required: [true, "Destekleyicileri boş bırakmayınız. Lütfen tekrar deneyin."],
        maxlength: [100, "Destekleyiciler en fazla 100 karakter olabilir"],
    },
    //Number of pages
    numberOfPages: {
        type: Number,
        validate: {
            validator: function (value) {
                return value === undefined || value === null || value >= 1;
            },
            message: "Sayfa sayısını boş bırakmayınız veya 1 veya daha fazla bir değer giriniz."
        }
    },
    paperType: {
        type: String,
        required: [true, "Kağıt tipini boş bırakmayınız. Lütfen tekrar deneyin."],
    },
    lid: {
        type: String,
        required: [true, "Kapak bilgisini boş bırakmayınız. Lütfen tekrar deneyin."]
    },
    bookType: {
        type: [String],
        required: [true, "Kitap türünü boş bırakmayınız. Lütfen tekrar deneyin."],
    },
    paymentOptions: {
        type: [String],
        required: [true, "Lütfen İlk Önce Ödeme Seçeneğinizi Seçin!"]
    },
    evaluation: {
        type: Number,
        required: [true, "Lütfen Kitabımıza 10 Üzerinden Bir Puan Verin!"],
        max: [10, "En Fazla 10 Puan Verebilirsiniz"],
    },  
        dimensions: {
            type: String, // Tipi "String" olarak değiştirin
            required: [true, "Lütfen Ölçüleri Boş Bırakmadığınızdan Emin Olun ve Tekrar Deneyin"]
        }
        
});

module.exports = mongoose.model('Book', bookSchema);
