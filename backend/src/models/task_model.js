const db = require('../config/database');

const TaskModel = {
  create(userId, title) {
    const stmt = db.prepare(`
      INSERT INTO tasks (user_id, title)
      VALUES (?, ?)
    `);
    const result = stmt.run(userId, title);
    return {
      id: result.lastInsertRowid,
      user_id: userId,
      title,
      is_completed: false
    };
  },

  findAllByUser(userId) {
    const stmt = db.prepare(`
      SELECT id, title, is_completed, created_at
      FROM tasks
      WHERE user_id = ?
      ORDER BY created_at DESC
    `);
    const tasks = stmt.all(userId);
    // Convert SQLite integer to boolean
    return tasks.map(task => ({
      ...task,
      is_completed: Boolean(task.is_completed)
    }));
  },

  findById(id, userId) {
    const stmt = db.prepare(`
      SELECT id, title, is_completed, created_at
      FROM tasks
      WHERE id = ? AND user_id = ?
    `);
    const task = stmt.get(id, userId);
    if (task) {
      task.is_completed = Boolean(task.is_completed);
    }
    return task;
  },

  update(id, userId, updates) {
    const fields = [];
    const values = [];

    if (updates.title !== undefined) {
      fields.push('title = ?');
      values.push(updates.title);
    }
    if (updates.is_completed !== undefined) {
      fields.push('is_completed = ?');
      values.push(updates.is_completed ? 1 : 0);
    }

    if (fields.length === 0) {
      return null;
    }

    values.push(id, userId);
    const stmt = db.prepare(`
      UPDATE tasks
      SET ${fields.join(', ')}
      WHERE id = ? AND user_id = ?
    `);
    const result = stmt.run(...values);
    return result.changes > 0;
  },

  delete(id, userId) {
    const stmt = db.prepare('DELETE FROM tasks WHERE id = ? AND user_id = ?');
    const result = stmt.run(id, userId);
    return result.changes > 0;
  }
};

module.exports = TaskModel;
