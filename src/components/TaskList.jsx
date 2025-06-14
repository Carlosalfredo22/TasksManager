import TaskItem from './TaskItem';

const TaskList = ({ tasks, onComplete, onDelete, onUpdateTitle }) => {
  if (tasks.length === 0) {
    return <p>No hay tareas disponibles.</p>;
  }

  return (
    <div>
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onComplete={onComplete}
          onDelete={onDelete}
          onUpdateTitle={onUpdateTitle}
        />
      ))}
    </div>
  );
};

export default TaskList;
