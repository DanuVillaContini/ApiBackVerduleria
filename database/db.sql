-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS sistmetododb;

-- Usar la base de datos
USE sistmetododb;

-- Crear la tabla de empleados
CREATE TABLE IF NOT EXISTS empleados (
    id INT(8) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(60) NOT NULL,
    apellido VARCHAR(60) NOT NULL,
    telefono VARCHAR(15), 
    correo VARCHAR(100) UNIQUE 
);

INSERT INTO empleados (name, apellido, telefono, correo) VALUES
('María', 'Gómez', '987654321', 'maria.gomez@email.com'),
('Carlos', 'Rodríguez', '555123456', 'carlos.rodriguez@email.com'),
('Laura', 'Fernández', '333555777', 'laura.fernandez@email.com'),
('Pedro', 'López', '777888999', 'pedro.lopez@email.com');


-- Insertar un registro de prueba
SELECT * FROM empleados;


