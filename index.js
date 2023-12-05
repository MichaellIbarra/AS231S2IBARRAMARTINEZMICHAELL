const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

// Configuración de MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'InstitutoValleGrande'
});
db.connect((err) => {
  if (err) throw err;
  console.log('Conexión exitosa a la base de datos');
});

// Configuración de Express
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Configuración de vista EJS 
app.set('view engine', 'ejs');

// Rutas de renderizar
app.get('/', (req, res) => {
  res.render('login');
});
app.get('/registro', (req, res) => {
  res.render('registro');
});

app.post('/registro', (req, res) => {
  const { carrera, nombres, apellidos, dni, fecha_nacimiento, correo_institucional, contrasena } = req.body;
  const sql = "INSERT INTO Estudiantes (carrera, nombres, apellidos, dni, fecha_nacimiento, correo_institucional, contrasena) VALUES (?, ?, ?, ?, ?, ?, ?)";
  db.query(sql, [carrera, nombres, apellidos, dni, fecha_nacimiento, correo_institucional, contrasena], (err, result) => {
    if (err) throw err;
    res.redirect('/');
  });
});

app.post('/panel', (req, res) => {
  const { correo_institucional, contrasena } = req.body;
  const sql = "SELECT * FROM Estudiantes WHERE correo_institucional = ? AND contrasena = ?";
  db.query(sql, [correo_institucional, contrasena], (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      const estudiante = results[0];
      console.log(estudiante);
      res.render('panel', { estudiante });
    } else {
      res.redirect('/');
    }
  
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
