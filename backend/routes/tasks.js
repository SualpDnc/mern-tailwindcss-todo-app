// Gerekli kütüphaneleri ve modeli dahil ediyoruz
const express = require('express');
const router = express.Router();
const Task = require('../models/task');

// ------------------- GET: Tüm görevleri getir -------------------
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find(); // Veritabanındaki tüm görevleri bul
    res.status(200).json(tasks);     // 200 OK ile görevleri gönder
  } catch (err) {
    res.status(500).json({ error: 'Görevler alınamadı' }); // Hata varsa 500
  }
});

// ------------------- POST: Yeni görev oluştur -------------------
router.post('/', async (req, res) => {
  try {
    const newTask = new Task({
      title: req.body.title // Görev başlığını istekten al
    });
    const savedTask = await newTask.save(); // Görevi veritabanına kaydet
    res.status(201).json(savedTask);        // 201 Created ile yanıtla
  } catch (err) {
    res.status(400).json({ error: 'Görev oluşturulamadı' });
  }
});

// ------------------- PUT: Görev güncelle -------------------
router.put('/:id', async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,             // Güncellenecek görevin ID'si
      req.body,                  // Yeni veriler (örneğin title veya completed)
      { new: true }              // Güncel belgeyi döndür
    );
    res.status(200).json(updatedTask);
  } catch (err) {
    res.status(400).json({ error: 'Görev güncellenemedi' });
  }
});

// ------------------- DELETE: Görev sil -------------------
router.delete('/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id); // ID'ye göre sil
    res.status(204).end(); // Başarıyla silindi, içerik dönme
  } catch (err) {
    res.status(400).json({ error: 'Görev silinemedi' });
  }
});

// Router'ı dışa aktarıyoruz
module.exports = router;
