const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;

// Conexión a MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'tu_usuario',
  password: 'tu_contraseña',
  database: 'tareasdb'
});

db.connect(err => {
  if (err) {
    console.error('❌ Error al conectar a la base de datos:', err);
    process.exit(1);
  }
  console.log('✅ Conectado a la base de datos MySQL');
});

app.use(express.json());

// Rutas

// Ruta de bienvenida
app.get('/', (req, res) => {
  res.send('Bienvenido a la API de tareas con MySQL');
});

// Obtener todas las tareas
app.get('/tareas', (req, res) => {
  db.query('SELECT * FROM tareas', (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al obtener tareas' });
    res.json(results);
  });
});

// Agregar nueva tarea
app.post('/tareas', (req, res) => {
  const { descripcion } = req.body;
  if (!descripcion) return res.status(400).json({ error: 'Falta descripción' });

  db.query('INSERT INTO tareas (descripcion) VALUES (?)', [descripcion], (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al agregar tarea' });
    res.status(201).json({ id: result.insertId, descripcion, completada: false });
  });
});

// Marcar tarea como completada
app.put('/tareas/:id', (req, res) => {
  const id = req.params.id;
  db.query('UPDATE tareas SET completada = true WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al actualizar tarea' });
    res.json({ id: parseInt(id), completada: true });
  });
});

// Eliminar tarea
app.delete('/tareas/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM tareas WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: 'Error al eliminar tarea' });
    res.status(204).send();
  });
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
});