const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');

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
  if (err) {
    console.error('Error de conexión a la base de datos: ' + err.stack);
    return;
  }
  console.log('Conexión exitosa a la base de datos');
});

// Configuración de Express
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

// Configuración de EJS como motor de plantillas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Rutas
app.get('/', (req, res) => {
  res.render('login');
});

app.get('/registro', (req, res) => {
  res.render('registro');
});


app.post('/registro', (req, res) => {
    const { carrera, nombres, apellidos, dni, fecha_nacimiento, correo_institucional, contrasena, terminos_condiciones } = req.body;

    // Validar los datos en el servidor (por si se intenta enviar la solicitud sin ejecutar JavaScript)
    if (!carrera || !nombres || !apellidos || !dni || !fecha_nacimiento || !correo_institucional || !contrasena || !terminos_condiciones) {
        res.send('Todos los campos deben estar completos.');
        return;
    }
    if (!correo_institucional.endsWith('@vallegrande.edu.pe')) {
        res.send('El correo institucional debe terminar con @vallegrande.edu.pe');
        return;
    }
    if (dni.length !== 8 || isNaN(dni)) {
        res.send('El número de DNI debe tener 8 dígitos.');
        return;
    }
    const sql = "INSERT INTO Estudiantes (carrera, nombres, apellidos, dni, fecha_nacimiento, correo_institucional, contrasena) VALUES (?, ?, ?, ?, ?, ?, ?)";
    db.query(sql, [carrera, nombres, apellidos, dni, fecha_nacimiento, correo_institucional, contrasena], (err, result) => {
        if (err) {
            console.error('Error al registrar estudiante: ' + err.message);
            res.redirect('/registro-error');
        } else {
            res.redirect('login');
        }
    });
});


app.get('/login', (req, res) => {
  res.render('login');
});


app.post('/login', (req, res) => {
    const { correo_institucional, contrasena } = req.body;
    const sql = "SELECT * FROM Estudiantes WHERE correo_institucional = ? AND contrasena = ?";
    db.query(sql, [correo_institucional, contrasena], (err, results) => {
      if (err) {
        console.error('Error al realizar la consulta: ' + err.message);
        res.redirect('/login-error');
      } else {
        if (results.length > 0) {
          const estudiante = results[0];
          res.render('panel', { estudiante });
        } else {
          res.redirect('/login-error');
        }
      }
    });
  });
  
// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
