import { useEffect, useState } from 'react';
import api from '../service/api';
import TaskList from '../components/TaskList';
import AddTaskForm from '../components/AddTaskForm';
import Navbar from '../components/Navbar';

const TaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const loadTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get('/tasks');
      console.log('Tareas recibidas:', res.data);
      setTasks(res.data);
    } catch (e) {
      setError('Error al cargar las tareas.');
    } finally {
      setLoading(false);
    }
  };

  const addTask = async title => {
    try {
      const res = await api.post('/tasks', { title });
      setTasks(prev => [...prev, res.data]);
      setMessage('¡Has creado una nueva tarea con éxito!');
      setTimeout(() => setMessage(null), 3000);
    } catch {
      setError('Error al añadir la tarea');
      setTimeout(() => setError(null), 3000);
    }
  };

  const completeTask = async (id, completed) => {
    try {
      await api.put(`/tasks/${id}`, { completed });
      setTasks(tasks.map(t => (t.id === id ? { ...t, completed } : t)));
    } catch {
      setError('Error al actualizar el estado');
      setTimeout(() => setError(null), 3000);
    }
  };

  const deleteTask = async id => {
    if (!window.confirm('¿Seguro que quieres eliminar esta tarea?')) return;
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter(t => t.id !== id));
    } catch {
      setError('Error al eliminar la tarea');
      setTimeout(() => setError(null), 3000);
    }
  };

  const updateTaskTitle = async (id, title) => {
    try {
      const res = await api.put(`/tasks/${id}`, { title });
      setTasks(tasks.map(t => (t.id === id ? res.data : t)));
    } catch {
      setError('Error al actualizar el título');
      setTimeout(() => setError(null), 3000);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  function roles() {
    // Obtener los roles del localStorage
    const roles = localStorage.getItem('roles');
    return roles ? JSON.parse(roles) : [];
  }

  return (
    <div className="container mt-4" style={{ maxWidth: 700 }}>
      <Navbar />
      {roles().includes('admin') && (
        <div className="alert alert-info">
          Eres un administrador. Puedes gestionar todas las tareas.
        </div>
      )}
      <h2 className="mb-4 text-center">Mis Tareas</h2>

      {/* Mensaje de éxito */}
      {message && <div className="alert alert-success">{message}</div>}

      {/* Mensaje de error */}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Formulario para agregar tarea */}
      <AddTaskForm onAdd={addTask} />

      {/* Mensaje de carga justo aquí debajo del formulario */}
      {loading && <div className="alert alert-info mt-3">Cargando tareas...</div>}

      {/* Mostrar "no hay tareas" solo si no hay error ni loading */}
      {!loading && !error && tasks.length === 0 && (
        <div className="alert alert-warning mt-3">No hay tareas disponibles.</div>
      )}

      {/* Lista de tareas */}
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