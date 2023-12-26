const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Bir Şeyler Yanlış Lütfen Kitap Adını Boş Bırakmadığınızdan Emin Olup Tekrar Deneyin"],
        maxlength: [100, "Kitap adı en fazla 100 karakter olabilir"],
    },
    author: {
        type: String,
        required: [true, "Bir Şeyler Yanlış Lütfen Yazarı Boş Bırakmadığınızdan Emin Olup Tekrar Deneyin"],
        maxlength: [80, "Yazar adı en fazla 80 karakter olabilir"],
    },
    publishYear: {
        type: Number,
        required: [true, "Birşeyler Yanlış Lütfen Publısh Yearı Boş Bırakmadığınızdan Emin Olup Tekrar Deneyin"],
        min: [2000, "Yayın yılı en az 2000 olabilir"],
        max: [2023, "Yayın yılı en fazla 2023 olabilir"],
    },
    publisher: {
        type: String,
        required: [true, "Bir Şeyler Yanlış :( Lütfen Yayın Evini Boş Bırakmadığınızdan Emin Olup Tekrar Deneyin"],
        maxlength: [100, "Yayınevi en fazla 100 karakter olabilir"],
    },
    stock: {
        type: Number,
        required: [true, "Bir Şeyler Yanlış :( Lütfen Stok Miktarını Boş bırakmadığınızdan Emin Olup Tekrar Deneyin"],
        min: [0, "Stok miktarı en az 0 olabilir"],
    },
    price: {
        type: Number,
        required: [true, "Bir Şeyler Yanlış :( Lütfen Fiyat Miktarını Boş Bırakmadığınızdan Emin Olun"],
        min: [5, "Fiyat Miktarı en az 5 TL olabilir"],
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
numberOfPages: {
    type: Number,
    required: [true, "Bir Şeyler Ters Gitti lütfen Sayfa Sayısını Boş Bırakmadığınızdan Emin Olup Tekrar Deneyin"],
    min: 1,
    max: [650, "Sayfa Sayısı En Fazla 650 Karakter Olabilir Bu Sayıyı Geçmediğinizden Emin Olup Tekrar Deneyin"]
}
,paperType: {
    type: String,
    required: [true, "Bir Şeyler Ters Gitti Lütfen Kağıt Tipini Boş Bırakmadığınızdan Emin Olup Tekrar Deneyin"],
}
,lid: {
type: String,
required: [true, "Bir Şeyler Ters Gitti Lütfen Kapağı Boş Bırakmadığınızdan Emin Olup Tekrar Deneyin"]

}
,bookType:{
type: [String],
required: [true, "Bir Şeyler Ters Gitti Lütfen kitap Türünü Boş Bırakmadığınızdan Emin Olup Tekrar Deneyin"]
}







})


module.exports = mongoose.model('Book', bookSchema);