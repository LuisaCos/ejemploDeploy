const express = require('express');
const mysql = require('mysql2');

const app = express();
const PORT = 3000;

// ConfiguraciÃ³n de la base de datos
const conexion = {
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    port: process.env.MYSQLPORT,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE
  }

console.log("RT::", conexion)
const connection = mysql.createConnection(conexion);

// Conectar a la base de datos
connection.connect(err => {
  if (err) {
    console.error('Error conectando a la base de datos:', err.stack);
    return;
  }
  console.log('Conectado a la base de datos.');
});

// Ruta GET /personas
app.get('/personas', (req, res) => {
  connection.query('SELECT * FROM person', (error, results) => {
    if (error) {
      console.error('Error al consultar la tabla:', error);
      res.status(500).json({ error: 'Error al consultar la base de datos' });
    } else {
      res.json(results);
    }
  });
});

app.get('/', (req, res) => {
   res.send("hola ric")
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});