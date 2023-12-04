CREATE DATABASE IF NOT EXISTS InstitutoValleGrande;

-- Seleccionar la base de datos
USE InstitutoValleGrande;

-- Crear la tabla Estudiantes
CREATE TABLE IF NOT EXISTS Estudiantes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    carrera VARCHAR(255) NOT NULL,
    nombres VARCHAR(255) NOT NULL,
    apellidos VARCHAR(255) NOT NULL,
    dni VARCHAR(20) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    correo_institucional VARCHAR(255) NOT NULL,
    contrasena VARCHAR(255) NOT NULL
);

select * from Estudiantes;