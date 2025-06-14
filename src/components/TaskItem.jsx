import { useState } from 'react';
import { motion } from 'framer-motion';

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
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className={`card mb-2 ${task.completed ? 'bg-light' : ''}`}
    >
      <div className="card-body d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center flex-grow-1 me-3">
          <input
            className="form-check-input me-3"
            type="checkbox"
            checked={task.completed}
            onChange={e => onComplete(task.id, e.target.checked)}
          />

          {editMode ? (
            <input
              type="text"
              className="form-control"
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              autoFocus
            />
          ) : (
            <span
              className={`flex-grow-1 ${
                task.completed ? 'text-decoration-line-through text-muted' : ''
              }`}
            >
              {task.title}
            </span>
          )}
        </div>

        <div>
          {editMode ? (
            <>
              <button
                className="btn btn-sm btn-success me-2"
                onClick={handleSave}
                type="button"
              >
                Guardar
              </button>
              <button
                className="btn btn-sm btn-secondary me-2"
                onClick={handleCancel}
                type="button"
              >
                Cancelar
              </button>
            </>
          ) : (
            <button
              className="btn btn-sm btn-outline-primary me-2"
              onClick={() => setEditMode(true)}
              type="button"
            >
              Editar
            </button>
          )}

          <button
            className="btn btn-sm btn-outline-danger"
            onClick={() => onDelete(task.id)}
            type="button"
          >
            Eliminar
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskItem;
