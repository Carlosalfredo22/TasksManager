import { useState } from 'react';

const AddTaskForm = ({ onAdd }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(title.trim());
      setTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex mb-4">
      <input
        type="text"
        className="form-control me-2"
        placeholder="Nueva tarea"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <button type="submit" className="btn btn-primary">
        Añadir
      </button>
    </form>
  );
};

export default AddTaskForm;
