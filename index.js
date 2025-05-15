const express = require('express');
const app = express();
const port = 3000;

// Middleware para leer JSON
app.use(express.json());

// Datos en memoria (no persistentes)
let tareas = [];
let id = 1;

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Bienvenido a la API de tareas');
});

// Obtener todas las tareas
app.get('/tareas', (req, res) => {
  res.json(tareas);
});

// Agregar una nueva tarea
app.post('/tareas', (req, res) => {
  const { descripcion } = req.body;
  if (!descripcion) {
    return res.status(400).json({ error: 'Falta la descripción' });
  }
  const nuevaTarea = { id: id++, descripcion, completada: false };
  tareas.push(nuevaTarea);
  res.status(201).json(nuevaTarea);
});

// Marcar tarea como completada
app.put('/tareas/:id', (req, res) => {
  const tarea = tareas.find(t => t.id === parseInt(req.params.id));
  if (!tarea) {
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }
  tarea.completada = true;
  res.json(tarea);
});

// Eliminar tarea
app.delete('/tareas/:id', (req, res) => {
  tareas = tareas.filter(t => t.id !== parseInt(req.params.id));
  res.status(204).send();
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
