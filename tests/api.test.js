import request from "supertest";
import { beforeAll, describe, expect, test } from "vitest";
import app from "../src/app.js";
import db from "../src/db.js";

beforeAll(() => {
  db.prepare("DELETE FROM tasks").run();
});

describe("API de tareas", () => {
  test("POST /api/tasks crea una tarea", async () => {
    const response = await request(app)
      .post("/api/tasks")
      .send({ title: "TC01 - Crear tarea", description: "Detalle" });

    expect(response.status).toBe(201);
    expect(response.body.title).toBe("TC01 - Crear tarea");
    expect(response.body.status).toBe("pendiente");
  });

  test("GET /api/tasks retorna lista", async () => {
    const response = await request(app).get("/api/tasks");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });
});
