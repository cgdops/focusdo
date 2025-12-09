import { useState } from 'react';

function TaskInput({ onAdd }) {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(title.trim());
      setTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-4 mb-8">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="What needs to be done?"
        className="flex-1 px-4 py-3 border border-black focus:outline-none focus:ring-2 focus:ring-black"
      />
      <button
        type="submit"
        className="px-6 py-3 bg-black text-white font-medium hover:bg-gray-800 transition-colors"
      >
        Add
      </button>
    </form>
  );
}

export default TaskInput;
