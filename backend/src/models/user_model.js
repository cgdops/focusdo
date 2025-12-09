const db = require('../config/database');

const UserModel = {
  create(email, passwordHash, username = null) {
    const stmt = db.prepare(`
      INSERT INTO users (email, password_hash, username)
      VALUES (?, ?, ?)
    `);
    const result = stmt.run(email, passwordHash, username);
    return { id: result.lastInsertRowid, email, username };
  },

  findByEmail(email) {
    const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
    return stmt.get(email);
  },

  findById(id) {
    const stmt = db.prepare('SELECT id, email, username, created_at FROM users WHERE id = ?');
    return stmt.get(id);
  }
};

module.exports = UserModel;
