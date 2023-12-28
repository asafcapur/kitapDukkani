const mongoose = require('mongoose');

// Bir nesnenin içindeki özellikleri tanımlayan bir obje
const obje = {
    // "numberOfPages" adında bir özellik
    numberOfPages: {
        // Bu özellik bir sayı tipindedir
        type: Number,

        // Doğrulama (validation) kurallarını içeren "validate" özelliği
        validate: {
            // "validator" özelliği, doğrulama işlevini temsil eder
            validator: function (value) {
                // Doğrulama işlevi, belirli bir koşulu kontrol eder
                // Koşul, value'nun undefined, null veya 1'den büyük olmasıdır
                return value === undefined || value === null || value >= 1;
            },

            // "message" özelliği, doğrulama başarısız olduğunda gösterilecek hata mesajını içerir
            message: "Sayfa sayısını boş bırakmayınız veya 1 veya daha fazla bir değer giriniz."
        }
    },
    // Diğer özellikler buraya eklenebilir
};

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
        min: [1000, "Yayın yılı en az 2000 olabilir"],
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
        min: [5, "Türkiye Şartlarında Bu Kadar Oluyor :("],
    },
    barcode: {
        type: String,
        required: [true, "Barkodu boş bırakmayınız."],
        unique: true,
    },
    promoters: {
        type: [String],
        required: [true, "Destekleyicileri boş bırakmayınız. Lütfen tekrar deneyin."],
        maxlength: [100, "Destekleyiciler en fazla 100 karakter olabilir"],
    },
    ...obje, // obje içindeki özellikleri buraya ekleyin
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
})



module.exports = mongoose.model('Book', bookSchema);