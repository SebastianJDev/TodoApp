import { describe, expect, test } from "vitest";
import { validateTaskPayload } from "../src/validation.js";

describe("validateTaskPayload", () => {
  test("debe aceptar un payload valido", () => {
    const result = validateTaskPayload({
      title: "Tarea de prueba",
      description: "Descripcion valida",
      status: "pendiente",
    });

    expect(result.valid).toBe(true);
    expect(result.errors).toEqual([]);
  });

  test("debe rechazar titulo vacio", () => {
    const result = validateTaskPayload({ title: "   " });
    expect(result.valid).toBe(false);
    expect(result.errors[0]).toContain("titulo");
  });
});
