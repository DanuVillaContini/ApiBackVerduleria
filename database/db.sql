-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS sistmetododb;

-- Usar la base de datos
USE sistmetododb;

--Ver datos tabla
SELECT * FROM empleados;
SELECT * FROM proveedores;
SELECT * FROM productos;
SELECT * FROM stock;
SELECT * FROM clientes;
SELECT * FROM ventas;
SELECT * FROM pedidos;
SELECT * FROM acreedores;



-- Crear la tabla de empleados
-- CREATE TABLE IF NOT EXISTS empleados (
--     id INT(8) NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     name VARCHAR(60) NOT NULL,
--     apellido VARCHAR(60) NOT NULL,
--     telefono VARCHAR(15), 
--     correo VARCHAR(100) UNIQUE 
-- );
-- CREATE TABLE IF NOT EXISTS proveedores (
--     id INT(8) NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     name_empresa VARCHAR(60) NOT NULL,
--     name_encargado VARCHAR(80) NOT NULL,
--     telefono VARCHAR(15), 
--     direccion VARCHAR(100) UNIQUE 
-- );
-- CREATE TABLE IF NOT EXISTS productos (
--     id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     name VARCHAR(60) NOT NULL,
--     tipo VARCHAR(60) NOT NULL
-- );
-- CREATE TABLE IF NOT EXISTS stock (
--     id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     ProductoId INT NOT NULL,
--     Cantidad INT NOT NULL,
--     FOREIGN KEY (ProductoId) REFERENCES productos(id)
-- );
-- CREATE TABLE IF NOT EXISTS clientes (
--     id INT(8) NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     name_apellido VARCHAR(80) NOT NULL,
--     telefono VARCHAR(15) NOT NULL, 
--     direccion VARCHAR(100) UNIQUE 
-- );

-- CREATE TABLE IF NOT EXISTS ventas (
--     id INT(8) NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     clientes_id INT(8) NOT NULL,
--     total DECIMAL(10,2) NOT NULL,
--     FOREIGN KEY (clientes_id) REFERENCES clientes(id)
-- );

CREATE TABLE IF NOT EXISTS pedidos (
    id INT(8) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    clientes_id INT(8) NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (clientes_id) REFERENCES clientes(id)
);

CREATE TABLE IF NOT EXISTS acreedores (
    id INT(8) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    clientes_id INT(8) NOT NULL,
    ventas_id INT(8) NOT NULL,
    total_deudor DECIMAL(10,2) NULL,
    FOREIGN KEY (clientes_id) REFERENCES clientes(id),
    FOREIGN KEY (ventas_id) REFERENCES ventas(id)
);

-- ALTER TABLE acreedores MODIFY total_deudor DECIMAL(10,2) NULL;







-- -- Insertar datos en la tabla clientes
-- INSERT INTO clientes (name_apellido, telefono, direccion) VALUES
-- ('Juan Pérez', '123-456-7890', 'Calle A #123'),
-- ('María López', '987-654-3210', 'Avenida B #456'),
-- ('Pedro Gómez', '555-123-4567', 'Carrera C #789');

-- -- Insertar datos en la tabla ventas
-- INSERT INTO ventas (clientes_id, total) VALUES
-- (1, 150.00),
-- (2, 200.50),
-- (3, 100.75);

-- Insertar datos en la tabla pedidos
INSERT INTO pedidos (clientes_id, total) VALUES
(2, 50.25),
(3, 75.50),
(1, 120.00);

-- Insertar datos en la tabla acreedores
INSERT INTO acreedores (clientes_id, ventas_id, total_deudor) VALUES
(3, 1, 30.00),
(1, 2, 50.50),
(2, 3, 25.75);





-- Insertar un registros de prueba
INSERT INTO empleados (name, apellido, telefono, correo) VALUES
('María', 'Gómez', '987654321', 'maria.gomez@email.com'),
('Carlos', 'Rodríguez', '555123456', 'carlos.rodriguez@email.com'),
('Laura', 'Fernández', '333555777', 'laura.fernandez@email.com'),
('Pedro', 'López', '777888999', 'pedro.lopez@email.com');
INSERT INTO proveedores (name_empresa, name_encargado, telefono, direccion) VALUES
('Fruta Distri', 'María Gómez', '987654321', 'Santa Fe 1500'),
('Verduras Distri', 'Carlos Rodríguez', '555123456', 'Cordoba 350'),
('Mercofrut', 'Ramiro Fernández', '333555777', 'Avenida Belgrano 1800'),
('Flete', 'Jose López', '777888999', 'Camino del Peru 2500');
INSERT INTO productos (name, tipo) VALUES
('Manzana', 'Fruta'),
('Tomate', 'Fruta'),
('Cebolla', 'Verdura'),
('Jengibre', 'Tuberculo')

INSERT INTO stock (ProductoId, Cantidad) VALUES
(1, 20),
(5, 60),
(3, 15),
(4, 10);
INSERT INTO clientes (name_apellido, telefono, direccion) VALUES
('María Gómez', '987654321', 'Santa Fe 1500'),
('Carlos Rodríguez', '555123456', 'Camino del Peru 2500'),
('Laura Fernández', '333555777', 'Cordoba 350'),
('Pedro López', '777888999', 'Avenida Belgrano 1800');






