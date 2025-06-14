import { useState } from 'react';

const AddTaskForm = ({ onAdd }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(title);
      setTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Nueva tarea" />
      <button type="submit">Añadir</button>
    </form>
  );
};

export default AddTaskForm;
