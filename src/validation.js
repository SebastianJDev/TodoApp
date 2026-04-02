export const VALID_STATUSES = ["pendiente", "en_proceso", "completada"];

export function validateTaskPayload(payload, isPartial = false) {
  const errors = [];

  if (!isPartial || Object.prototype.hasOwnProperty.call(payload, "title")) {
    if (typeof payload.title !== "string" || payload.title.trim().length === 0) {
      errors.push("El titulo es obligatorio.");
    } else if (payload.title.trim().length > 120) {
      errors.push("El titulo no puede superar 120 caracteres.");
    }
  }

  if (Object.prototype.hasOwnProperty.call(payload, "description")) {
    if (typeof payload.description !== "string") {
      errors.push("La descripcion debe ser texto.");
    } else if (payload.description.trim().length > 500) {
      errors.push("La descripcion no puede superar 500 caracteres.");
    }
  }

  if (Object.prototype.hasOwnProperty.call(payload, "status")) {
    if (!VALID_STATUSES.includes(payload.status)) {
      errors.push("Estado invalido. Usa pendiente, en_proceso o completada.");
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
