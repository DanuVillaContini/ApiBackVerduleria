import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { connectMysql } from "../db.js"

export const register = async (req, res) => {
    try {
        const { nameUser, correoUser, pass } = req.body;

        const hashedPassword = await bcrypt.hash(pass, 10);

        const insertQuery = 'INSERT INTO usuarios (nameUser, correoUser, pass) VALUES (?, ?, ?)';
        const values = [nameUser, correoUser, hashedPassword];

        connectMysql.query(insertQuery, values, (err, results) => {
            if (err) {
                console.error('Error registering user:', err);
                res.status(500).send('Error registering user');
            } else {
                res.status(201).send('User registered successfully');
            }
        });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send('Error registering user');
    }
};

export const login = async (req, res) => {
    try {
        const { correoUser, pass } = req.body;

        const selectQuery = 'SELECT * FROM usuarios WHERE correoUser = ?';
        const values = [correoUser];

        connectMysql.query(selectQuery, values, async (err, results) => {
            if (err) {
                console.error('Error authenticating user:', err);
                res.status(500).send('Error authenticating user');
            } else if (results.length > 0) {
                const isPasswordValid = await bcrypt.compare(pass, results[0].pass);

                if (isPasswordValid) {
                    const token = jwt.sign({ id: results[0].id }, 'tu_secreto', { expiresIn: '1h' });
                    res.json({ token });
                } else {
                    res.status(401).send('Invalid password');
                }
            } else {
                res.status(401).send('User not found');
            }
        });
    } catch (error) {
        console.error('Error authenticating user:', error);
        res.status(500).send('Error authenticating user');
    }
};

