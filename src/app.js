import express from "express";
import db from "./db.js";
import { validateTaskPayload } from "./validation.js";

const app = express();

app.use(express.json());
app.use(express.static("public"));

function mapTask(row) {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.get("/api/tasks", (_req, res) => {
  const rows = db
    .prepare("SELECT * FROM tasks ORDER BY created_at DESC")
    .all()
    .map(mapTask);

  res.json(rows);
});

app.post("/api/tasks", (req, res) => {
  const payload = req.body ?? {};
  const validation = validateTaskPayload(payload);

  if (!validation.valid) {
    return res.status(400).json({ errors: validation.errors });
  }

  const now = new Date().toISOString();
  const result = db
    .prepare(
      `INSERT INTO tasks (title, description, status, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?)`
    )
    .run(
      payload.title.trim(),
      (payload.description ?? "").trim(),
      payload.status ?? "pendiente",
      now,
      now
    );

  const created = db
    .prepare("SELECT * FROM tasks WHERE id = ?")
    .get(result.lastInsertRowid);

  return res.status(201).json(mapTask(created));
});

app.put("/api/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const existing = db.prepare("SELECT * FROM tasks WHERE id = ?").get(id);

  if (!existing) {
    return res.status(404).json({ error: "Tarea no encontrada." });
  }

  const payload = req.body ?? {};
  const validation = validateTaskPayload(payload, true);

  if (!validation.valid) {
    return res.status(400).json({ errors: validation.errors });
  }

  const title = payload.title?.trim() ?? existing.title;
  const description = payload.description?.trim() ?? existing.description;
  const status = payload.status ?? existing.status;
  const now = new Date().toISOString();

  db.prepare(
    `UPDATE tasks
     SET title = ?, description = ?, status = ?, updated_at = ?
     WHERE id = ?`
  ).run(title, description, status, now, id);

  const updated = db.prepare("SELECT * FROM tasks WHERE id = ?").get(id);

  return res.json(mapTask(updated));
});

app.patch("/api/tasks/:id/complete", (req, res) => {
  const id = Number(req.params.id);
  const existing = db.prepare("SELECT * FROM tasks WHERE id = ?").get(id);

  if (!existing) {
    return res.status(404).json({ error: "Tarea no encontrada." });
  }

  const now = new Date().toISOString();
  db.prepare("UPDATE tasks SET status = 'completada', updated_at = ? WHERE id = ?").run(now, id);

  const updated = db.prepare("SELECT * FROM tasks WHERE id = ?").get(id);
  return res.json(mapTask(updated));
});

app.delete("/api/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const result = db.prepare("DELETE FROM tasks WHERE id = ?").run(id);

  if (result.changes === 0) {
    return res.status(404).json({ error: "Tarea no encontrada." });
  }

  return res.status(204).send();
});

export default app;
