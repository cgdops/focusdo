const TaskModel = require('../models/task_model');

const TaskController = {
  getAll(req, res) {
    try {
      const tasks = TaskModel.findAllByUser(req.userId);
      res.json(tasks);
    } catch (error) {
      console.error('Get tasks error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  create(req, res) {
    try {
      const { title } = req.body;

      if (!title || !title.trim()) {
        return res.status(400).json({ error: 'Title is required' });
      }

      const task = TaskModel.create(req.userId, title.trim());
      res.status(201).json(task);
    } catch (error) {
      console.error('Create task error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  update(req, res) {
    try {
      const { id } = req.params;
      const { title, is_completed } = req.body;

      // Check if task exists and belongs to user
      const task = TaskModel.findById(id, req.userId);
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }

      const updates = {};
      if (title !== undefined) {
        if (!title.trim()) {
          return res.status(400).json({ error: 'Title cannot be empty' });
        }
        updates.title = title.trim();
      }
      if (is_completed !== undefined) {
        updates.is_completed = is_completed;
      }

      const updated = TaskModel.update(id, req.userId, updates);
      if (updated) {
        res.json({ id: parseInt(id), updated: true });
      } else {
        res.status(400).json({ error: 'No updates provided' });
      }
    } catch (error) {
      console.error('Update task error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  delete(req, res) {
    try {
      const { id } = req.params;

      const deleted = TaskModel.delete(id, req.userId);
      if (deleted) {
        res.json({ message: 'Task deleted' });
      } else {
        res.status(404).json({ error: 'Task not found' });
      }
    } catch (error) {
      console.error('Delete task error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

module.exports = TaskController;
