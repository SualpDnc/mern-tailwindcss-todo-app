const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// ✅ CORS'u burada aktif et – en üste yaz
app.use(cors()); // 🔥 sadece bu satır yeterli, ek ayar yazma

// ✅ JSON body parse
app.use(express.json());

// ✅ Rotalar
const taskRoutes = require('./routes/tasks');
app.use('/api/tasks', taskRoutes);

// ✅ MongoDB Bağlantısı
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB bağlantısı başarılı');
    app.listen(PORT, () => {
      console.log(`🚀 Sunucu ${PORT} portunda çalışıyor`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB bağlantısı başarısız:', err);
  });

  app.get('/cors-test', (req, res) => {
    res.send('CORS test OK');
  });