const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

// Default to local path
let dbPath = path.join(__dirname, '../../focusdo.db');

// If DATABASE_PATH is set, try to use it (for persistent disk on paid plans)
if (process.env.DATABASE_PATH) {
  const persistentPath = process.env.DATABASE_PATH;
  const persistentDir = path.dirname(persistentPath);

  try {
    // Try to create the directory if it doesn't exist
    if (!fs.existsSync(persistentDir)) {
      fs.mkdirSync(persistentDir, { recursive: true });
    }
    // If successful, use the persistent path
    dbPath = persistentPath;
    console.log(`Using persistent database at: ${dbPath}`);
  } catch (err) {
    // If we can't create the persistent directory (e.g., free tier without disk),
    // fall back to local path
    console.warn(`Cannot use persistent database path (${persistentPath}): ${err.message}`);
    console.log(`Falling back to local database at: ${dbPath}`);
  }
} else {
  console.log(`Using local database at: ${dbPath}`);
}

// Ensure the final database directory exists
const dbDir = path.dirname(dbPath);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const db = new Database(dbPath);

// Enable foreign keys
db.pragma('foreign_keys = ON');

// Initialize tables
function initializeDatabase() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      title TEXT NOT NULL,
      is_completed INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
  `);
}

initializeDatabase();

module.exports = db;
