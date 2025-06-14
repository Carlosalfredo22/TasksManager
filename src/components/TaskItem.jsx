import { useState } from 'react';

const TaskItem = ({ task, onComplete, onDelete, onUpdateTitle }) => {
  const [editMode, setEditMode] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);

  const handleSave = () => {
    if (newTitle.trim() && newTitle !== task.title) {
      onUpdateTitle(task.id, newTitle.trim());
    }
    setEditMode(false);
  };

  const handleCancel = () => {
    setNewTitle(task.title);
    setEditMode(false);
  };

  return (
    <div style={{
      border: '1px solid #ccc',
      borderRadius: '5px',
      padding: '8px',
      marginBottom: '10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1 }}>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={e => onComplete(task.id, e.target.checked)}
        />

        {editMode ? (
          <input
            type="text"
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
            style={{ flex: 1 }}
          />
        ) : (
          <span style={{
            textDecoration: task.completed ? 'line-through' : 'none',
            flex: 1
          }}>
            {task.title}
          </span>
        )}
      </div>

      <div style={{ display: 'flex', gap: '5px' }}>
        {editMode ? (
          <>
            <button onClick={handleSave}>Guardar</button>
            <button onClick={handleCancel}>Cancelar</button>
          </>
        ) : (
          <button onClick={() => setEditMode(true)}>Editar</button>
        )}
        <button onClick={() => onDelete(task.id)}>Eliminar</button>
      </div>
    </div>
  );
};

export default TaskItem;
