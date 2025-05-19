import React, { useState, useEffect } from 'react'; // React hook'ları
import axios from 'axios'; // HTTP istekleri için axios

function App() {
  // Görevleri saklamak için state
  const [tasks, setTasks] = useState([]);
  // Yeni görev inputu için state
  const [newTask, setNewTask] = useState('');

  // Sayfa yüklendiğinde görevleri çek
  useEffect(() => {
    fetchTasks();
  }, []);

  // Backend'den görevleri al
  const fetchTasks = async () => {
    try {
      const res = await axios.get('/api/tasks'); // GET isteği gönder
      setTasks(res.data); // Görevleri state'e kaydet
    } catch (err) {
      console.error('Görevler alınamadı:', err);
    }
  };

  // Yeni görev ekle
  const addTask = async () => {
    if (!newTask.trim()) return; // Boş görev eklenmesin

    try {
      const res = await axios.post('/api/tasks', { title: newTask }); // POST isteği
      setTasks([...tasks, res.data]); // Yeni görevi mevcut listeye ekle
      setNewTask(''); // input'u temizle
    } catch (err) {
      console.error('Görev eklenemedi:', err);
    }
  };

  // Görev sil
  const deleteTask = async (id) => {
    try {
      await axios.delete(`/api/tasks/${id}`); // DELETE isteği
      // Silinen görev dışındakileri filtrele
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (err) {
      console.error('Görev silinemedi:', err);
    }
  };

  // Görev tamamlama durumunu değiştir
  const toggleTask = async (id, completed) => {
    try {
      const res = await axios.put(`/api/tasks/${id}`, {
        completed: !completed, // Mevcut durumu tersine çevir
      });
      // Güncellenen görevi state'te değiştir
      setTasks(tasks.map((task) => (task._id === id ? res.data : task)));
    } catch (err) {
      console.error('Görev güncellenemedi:', err);
    }
  };

  return (
    // Tüm ekranı kaplayan, ortalanmış arka plan
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      {/* İç kart yapısı */}
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-6">
        {/* Başlık */}
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          📝 Görev Listesi
        </h1>

        {/* Görev ekleme alanı */}
        <div className="flex gap-2 mb-6">
          {/* Input alanı */}
          <input
            type="text"
            placeholder="Yeni görev girin"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="flex-grow p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            // className açıklaması:
            // flex-grow: input genişlik kaplasın
            // p-3: padding
            // border + focus:ring: mavi kenarlık efekti
          />
          {/* Ekle butonu */}
          <button
            onClick={addTask}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
            // hover:bg-blue-600: üzerine gelince koyulaşır
            // transition: geçiş efekti
          >
            Ekle
          </button>
        </div>

        {/* Görev listesi */}
        <ul className="space-y-3">
          {tasks.map((task) => (
            <li
              key={task._id}
              className="flex items-center justify-between bg-gray-50 border border-gray-200 p-3 rounded-lg shadow-sm"
            >
              {/* Sol kısım: checkbox + başlık */}
              <div className="flex items-center gap-2">
                {/* Tamamlandı mı? */}
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task._id, task.completed)}
                  className="h-5 w-5 text-blue-600"
                />
                {/* Başlık */}
                <span
                  className={`${
                    task.completed ? 'line-through text-gray-400' : ''
                  } text-lg text-gray-800`}
                >
                  {task.title}
                </span>
              </div>
              {/* Sil butonu */}
              <button
                onClick={() => deleteTask(task._id)}
                className="text-sm bg-red-100 text-red-600 px-3 py-1 rounded-lg hover:bg-red-200 transition"
              >
                Sil
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
