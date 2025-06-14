import { useEffect, useState } from 'react';
import api from '../service/api';
import TaskList from '../components/TaskList';
import AddTaskForm from '../components/AddTaskForm';
import Navbar from '../components/Navbar';

const TaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get('/tasks');
      setTasks(res.data);
    } catch {
      setError('Error al cargar las tareas.');
    } finally {
      setLoading(false);
    }
  };

  const addTask = async title => {
    try {
      const res = await api.post('/tasks', { title });
      setTasks(prev => [...prev, res.data]);
    } catch {
      alert('Error al añadir la tarea');
    }
  };

  const completeTask = async (id, completed) => {
    try {
      await api.put(`/tasks/${id}`, { completed });
      setTasks(tasks.map(t => (t.id === id ? { ...t, completed } : t)));
    } catch {
      alert('Error al actualizar el estado');
    }
  };

  const deleteTask = async id => {
    if (!window.confirm('¿Seguro que quieres eliminar esta tarea?')) return;
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter(t => t.id !== id));
    } catch {
      alert('Error al eliminar la tarea');
    }
  };

  const updateTaskTitle = async (id, title) => {
    try {
      const res = await api.put(`/tasks/${id}`, { title });
      setTasks(tasks.map(t => (t.id === id ? res.data : t)));
    } catch {
      alert('Error al actualizar el título');
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div className="container mt-4" style={{ maxWidth: 700 }}>
      <Navbar />
      <h2 className="mb-4 text-center">Mis Tareas</h2>

      <AddTaskForm onAdd={addTask} />

      {loading && <div className="alert alert-info">Cargando tareas...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <TaskList
        tasks={tasks}
        onComplete={completeTask}
        onDelete={deleteTask}
        onUpdateTitle={updateTaskTitle}
      />
    </div>
  );
};

export default TaskPage;

