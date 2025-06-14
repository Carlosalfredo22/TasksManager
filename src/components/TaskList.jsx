import TaskItem from './TaskItem';
import { AnimatePresence } from 'framer-motion';

const TaskList = ({ tasks, onComplete, onDelete, onUpdateTitle }) => {
  if (tasks.length === 0) {
    return <p className="text-center">No hay tareas disponibles.</p>;
  }

  return (
    <div>
      <AnimatePresence>
        {tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onComplete={onComplete}
            onDelete={onDelete}
            onUpdateTitle={onUpdateTitle}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TaskList;
