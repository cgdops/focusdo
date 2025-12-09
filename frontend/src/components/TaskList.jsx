import TaskItem from './TaskItem';

function TaskList({ tasks, onToggle, onDelete, onEdit }) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No tasks yet. Add one above!
      </div>
    );
  }

  return (
    <div className="border border-gray-200">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}

export default TaskList;
