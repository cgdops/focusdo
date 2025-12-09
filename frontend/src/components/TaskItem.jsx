import { useState } from 'react';

function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.title);

  const handleEdit = () => {
    if (editText.trim() && editText !== task.title) {
      onEdit(task.id, editText.trim());
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleEdit();
    } else if (e.key === 'Escape') {
      setEditText(task.title);
      setIsEditing(false);
    }
  };

  return (
    <div className="flex items-center gap-4 p-4 border-b border-gray-200 group">
      <input
        type="checkbox"
        checked={task.is_completed}
        onChange={() => onToggle(task.id, !task.is_completed)}
        className="w-5 h-5 cursor-pointer accent-black"
      />

      {isEditing ? (
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleEdit}
          onKeyDown={handleKeyDown}
          autoFocus
          className="flex-1 px-2 py-1 border border-black focus:outline-none"
        />
      ) : (
        <span
          onClick={() => setIsEditing(true)}
          className={`flex-1 cursor-pointer ${
            task.is_completed ? 'line-through text-gray-400' : ''
          }`}
        >
          {task.title}
        </span>
      )}

      <button
        onClick={() => onDelete(task.id)}
        className="px-3 py-1 text-red-600 border border-red-600 opacity-0 group-hover:opacity-100 hover:bg-red-600 hover:text-white transition-all"
      >
        Delete
      </button>
    </div>
  );
}

export default TaskItem;
