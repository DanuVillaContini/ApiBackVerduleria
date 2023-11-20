import { connectMysql } from "../db.js"


export const getClientes = async (req, res) => {
    try {
        const [rows] = await connectMysql.query("SELECT * FROM clientes");
        res.json(rows);
    } catch (error) {
        return res.status(500).json({ message: "Ups, algo salio mal" });
    }
}

export const getClientesId = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await connectMysql.query("SELECT * FROM clientes WHERE id = ?", [
            id,
        ]);

        if (rows.length <= 0) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }

        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: "Ups, algo salio mal" });
    }
}

export const createClientes = async (req, res) => {
    try {
        const { name_apellido, telefono, direccion } = req.body;

        const [rows] = await connectMysql.query(
            "INSERT INTO clientes (name_apellido, telefono, direccion) VALUES (?, ?, ?)",
            [name_apellido, telefono, direccion]
        );
        res.status(201).json({ mensaje: "Nuevo Cliente Creado", id: rows.insertId, name_apellido, telefono, direccion });
    } catch (error) {
        return res.status(500).json({ message: "Ups, algo salio mal" });
    }
}

export const updateClientes = async (req, res) => {
    try {
        const { id } = req.params;
        const { name_apellido, telefono, direccion } = req.body;

        const [result] = await connectMysql.query(
            "UPDATE clientes SET name_apellido = IFNULL(?, name_apellido), telefono = IFNULL(?, telefono), direccion = IFNULL(?, direccion) WHERE id = ?",
            [name_apellido, telefono, direccion, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }

        const [rows] = await connectMysql.query("SELECT * FROM clientes WHERE id = ?", [id]);

        res.status(200).json({ mensaje: "Datos del Cliente Actualizados", cliente: rows[0] });
    } catch (error) {
        return res.status(500).json({ message: "Ups, algo salió mal" });
    }
}

export const deleteClientes = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await connectMysql.query("DELETE FROM clientes WHERE id = ?", [id]);

        if (rows.affectedRows <= 0) {
            return res.status(404).json({ message: "Clientes no encontrado" });
        }

        return res.status(204).json({ message: "Clientes eliminado exitosamente" });
    } catch (error) {
        return res.status(500).json({ message: "Ups, algo salió mal" });
    }
}
