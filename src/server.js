import app from "./app.js";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`To-Do App corriendo en http://localhost:${PORT}`);
});
