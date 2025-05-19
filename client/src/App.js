import React, { useState, useEffect } from 'react'; // React hook'ları
import axios from 'axios'; // HTTP istekleri için

function App() {
  // Görevler listesi için state
  const [tasks, setTasks] = useState([]);

  // Yeni görev başlığı için state
  const [newTask, setNewTask] = useState('');

  // Sayfa yüklendiğinde görevleri getirmek için useEffect
  useEffect(() => {
    fetchTasks();
  }, []);

  // Görevleri backend'den al
  const fetchTasks = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/tasks');
      setTasks(res.data);
    } catch (err) {
      console.error('Görevler alınamadı:', err);
    }
  };

  // Yeni görev ekle
  const addTask = async () => {
    if (!newTask.trim()) return;

    try {
      const res = await axios.post('http://localhost:5001/api/tasks', {
        title: newTask,
      });
      setTasks([...tasks, res.data]); // Yeni görevi listeye ekle
      setNewTask(''); // input temizle
    } catch (err) {
      console.error('Görev eklenemedi:', err);
    }
  };

  // Görev sil
  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/tasks/${id}`);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (err) {
      console.error('Görev silinemedi:', err);
    }
  };

  // Görev tamamlama durumunu değiştir
  const toggleTask = async (id, completed) => {
    try {
      const res = await axios.put(`http://localhost:5001/api/tasks/${id}`, {
        completed: !completed,
      });
      setTasks(
        tasks.map((task) => (task._id === id ? res.data : task))
      );
    } catch (err) {
      console.error('Görev güncellenemedi:', err);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '1rem' }}>
      <h1>📝 Görev Listesi</h1>

      {/* Yeni görev ekleme alanı */}
      <input
        type="text"
        placeholder="Yeni görev girin"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button onClick={addTask}>Ekle</button>

      {/* Görev listesi */}
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task._id, task.completed)}
            />
            <span
              style={{
                textDecoration: task.completed ? 'line-through' : 'none',
              }}
            >
              {task.title}
            </span>
            <button onClick={() => deleteTask(task._id)}>Sil</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
