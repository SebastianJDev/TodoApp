import Database from "better-sqlite3";

const db = new Database("todoapp.db");

db.exec(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL DEFAULT '',
    status TEXT NOT NULL DEFAULT 'pendiente',
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );
`);

export default db;
