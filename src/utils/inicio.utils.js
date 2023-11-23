import { createPool } from 'mysql2/promise';
import bcrypt from 'bcrypt';

import {
    DB_DATABASE,
    DB_HOST,
    DB_PASSWORD,
    DB_PORT,
    DB_USER
} from '../config.js';

const connectMysql = createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    port: DB_PORT,
    database: DB_DATABASE
});

const iniciarSuperUsuarioDB = async () => {
    try {
        // Consultar el número de registros en la tabla usuarios
        const [rowCount] = await connectMysql.execute('SELECT COUNT(*) as count FROM usuarios');

        // Verificar si ya existe algún superusuario
        if (rowCount[0].count > 0) {
            console.log('Bienvenido, soy el Superusuario creado');
            return;
        }

        // Si no hay superusuario, crear uno
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync('sistema1234', salt);

        const [insertResult] = await connectMysql.execute(
            'INSERT INTO usuarios (nameUser, correoUser, pass) VALUES (?, ?, ?)',
            ['superuser', 'superuser@example.com', hashedPassword]
        );

        console.log('Superusuario creado con éxito:', insertResult);
    } catch (error) {
        console.error('Error al crear el superusuario:', error);
    } finally {
        // Cerrar la conexión del pool
        await connectMysql.end();
    }
};

export { iniciarSuperUsuarioDB };
