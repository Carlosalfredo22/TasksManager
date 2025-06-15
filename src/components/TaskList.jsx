import TaskItem from './TaskItem';
import { AnimatePresence } from 'framer-motion';

const TaskList = ({ tasks, onComplete, onDelete, onUpdateTitle }) => {

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
