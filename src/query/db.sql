-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS sistmetododb;

-- Usar la base de datos
USE sistmetododb;

-- Crear la tabla de empleados
CREATE TABLE IF NOT EXISTS empleados (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(60) NOT NULL
);

-- Insertar un registro de prueba
SELECT * FROM empleados;
