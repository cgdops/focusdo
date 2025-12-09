import { useState, useEffect } from 'react';
import { taskApi } from '../services/api';
import TaskInput from '../components/TaskInput';
import TaskList from '../components/TaskList';

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('active');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const data = await taskApi.getAll();
      setTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (title) => {
    try {
      const newTask = await taskApi.create(title);
      setTasks([newTask, ...tasks]);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleToggle = async (id, isCompleted) => {
    try {
      await taskApi.update(id, { is_completed: isCompleted });
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, is_completed: isCompleted } : task
        )
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = async (id, title) => {
    try {
      await taskApi.update(id, { title });
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, title } : task
        )
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await taskApi.delete(id);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const filteredTasks =
    filter === 'active'
      ? tasks.filter((t) => !t.is_completed)
      : tasks.filter((t) => t.is_completed);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading tasks...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Tasks</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mb-4">
            {error}
            <button
              onClick={() => setError('')}
              className="float-right font-bold"
            >
              ×
            </button>
          </div>
        )}

        <TaskInput onAdd={handleAdd} />

        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setFilter('active')}
            className={`px-4 py-2 border ${
              filter === 'active'
                ? 'bg-black text-white border-black'
                : 'border-gray-300 hover:border-black'
            } transition-colors`}
          >
            Active
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-4 py-2 border ${
              filter === 'completed'
                ? 'bg-black text-white border-black'
                : 'border-gray-300 hover:border-black'
            } transition-colors`}
          >
            Completed
          </button>
        </div>

        <TaskList
          tasks={filteredTasks}
          onToggle={handleToggle}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </div>
    </div>
  );
}

export default Dashboard;
