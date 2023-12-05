const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'admin',
  database: 'InstitutoValleGrande'
});
db.connect((err) => {
  if (err) throw err;
  console.log('Conexión exitosa a la base de datos');
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("css"));

app.set('view engine', 'ejs');


app.get('/', (req, res) => {
  res.render('registrar');
});


app.post('/registro', (req, res) => {
  const { carrera, nombres, apellidos, dni, fecha_nacimiento, correo_institucional, contrasena } = req.body;
  const sql = "INSERT INTO Estudiantes (carrera, nombres, apellidos, dni, fecha_nacimiento, correo_institucional, contrasena) VALUES (?, ?, ?, ?, ?, ?, ?)";
  db.query(sql, [carrera, nombres, apellidos, dni, fecha_nacimiento, correo_institucional, contrasena], (err, result) => {
    if (err) throw err;
    res.redirect('/');
  });
});


app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});