// Mongoose kütüphanesini dahil ediyoruz
const mongoose = require('mongoose');

// Görev (Task) için bir şema (schema) tanımlıyoruz
const taskSchema = new mongoose.Schema({
  title: {
    type: String,         // Görevin başlığı string olacak
    required: true,       // Boş bırakılamaz
    trim: true            // Başındaki/sonundaki boşluklar silinecek
  },
  completed: {
    type: Boolean,        // Görev tamamlandı mı? true/false
    default: false        // Varsayılan olarak tamamlanmamış olacak
  }
}, {
  timestamps: true        // Otomatik olarak createdAt ve updatedAt alanları ekler
});

// Yukarıda tanımladığımız şemaya göre bir model oluşturuyoruz
const Task = mongoose.model('Task', taskSchema);

// Bu modeli dışa aktarıyoruz, böylece diğer dosyalarda kullanabiliriz
module.exports = Task;
