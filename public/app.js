const form = document.getElementById("taskForm");
const titleInput = document.getElementById("title");
const descriptionInput = document.getElementById("description");
const statusInput = document.getElementById("status");
const message = document.getElementById("message");

const lists = {
  pendiente: document.getElementById("pendiente"),
  en_proceso: document.getElementById("en_proceso"),
  completada: document.getElementById("completada"),
};

function setMessage(text, isError = false) {
  message.textContent = text;
  message.style.color = isError ? "#b91c1c" : "#166534";
}

async function api(url, options = {}) {
  const response = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (response.status === 204) return null;

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.errors?.join(" ") || data.error || "Error en la solicitud");
  }

  return data;
}

function taskTemplate(task) {
  const li = document.createElement("li");
  li.className = "task";
  li.innerHTML = `
    <h4>${task.title}</h4>
    <p>${task.description || "Sin descripcion"}</p>
    <div class="actions">
      <button data-action="edit">Editar</button>
      <button data-action="delete">Eliminar</button>
      ${task.status !== "completada" ? '<button class="ok" data-action="complete">Completar</button>' : ""}
    </div>
  `;

  li.querySelector('[data-action="edit"]').addEventListener("click", async () => {
    const title = prompt("Nuevo titulo", task.title);
    if (!title) return;

    const description = prompt("Nueva descripcion", task.description ?? "");
    try {
      await api(`/api/tasks/${task.id}`, {
        method: "PUT",
        body: JSON.stringify({ title, description, status: task.status }),
      });
      setMessage("Tarea editada correctamente.");
      await loadTasks();
    } catch (error) {
      setMessage(error.message, true);
    }
  });

  li.querySelector('[data-action="delete"]').addEventListener("click", async () => {
    if (!confirm("Seguro que deseas eliminar esta tarea?")) return;
    try {
      await api(`/api/tasks/${task.id}`, { method: "DELETE" });
      setMessage("Tarea eliminada.");
      await loadTasks();
    } catch (error) {
      setMessage(error.message, true);
    }
  });

  const completeBtn = li.querySelector('[data-action="complete"]');
  if (completeBtn) {
    completeBtn.addEventListener("click", async () => {
      try {
        await api(`/api/tasks/${task.id}/complete`, { method: "PATCH" });
        setMessage("Tarea marcada como completada.");
        await loadTasks();
      } catch (error) {
        setMessage(error.message, true);
      }
    });
  }

  return li;
}

async function loadTasks() {
  Object.values(lists).forEach((ul) => {
    ul.innerHTML = "";
  });

  const tasks = await api("/api/tasks");
  tasks.forEach((task) => {
    lists[task.status].appendChild(taskTemplate(task));
  });
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  try {
    await api("/api/tasks", {
      method: "POST",
      body: JSON.stringify({
        title: titleInput.value,
        description: descriptionInput.value,
        status: statusInput.value,
      }),
    });

    form.reset();
    statusInput.value = "pendiente";
    setMessage("Tarea creada correctamente.");
    await loadTasks();
  } catch (error) {
    setMessage(error.message, true);
  }
});

loadTasks().catch((error) => setMessage(error.message, true));
