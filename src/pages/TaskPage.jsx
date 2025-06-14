import { useEffect, useState } from 'react';
import api from '../service/api';
import TaskList from '../components/TaskList';
import AddTaskForm from '../components/AddTaskForm';
import Navbar from '../components/Navbar';  // <-- Importa aquí

const TaskPage = () => {
  const [tasks, setTasks] = useState([]);

  const loadTasks = async () => {
    const res = await api.get('/tasks');
    setTasks(res.data);
  };

  const addTask = async title => {
    const res = await api.post('/tasks', { title });
    setTasks([...tasks, res.data]);
  };

  const completeTask = async (id, completed) => {
    await api.put(`/tasks/${id}`, { completed });
    loadTasks();
  };

  const deleteTask = async id => {
    await api.delete(`/tasks/${id}`);
    setTasks(tasks.filter(t => t.id !== id));
  };

  const updateTaskTitle = async (id, title) => {
    const res = await api.put(`/tasks/${id}`, { title });
    setTasks(tasks.map(t => (t.id === id ? res.data : t)));
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div>
      <Navbar /> {/* <-- Aquí colocas el navbar */}
      <h2>Mis Tareas</h2>
      <AddTaskForm onAdd={addTask} />
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
