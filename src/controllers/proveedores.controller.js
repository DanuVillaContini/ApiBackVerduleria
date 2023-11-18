import { connectMysql } from "../db.js"


export const getProvee = async (req, res) => {
    try {
        const [rows] = await connectMysql.query("SELECT * FROM proveedores");
        res.json(rows);
    } catch (error) {
        return res.status(500).json({ message: "Ups, algo salio mal" });
    }
}
export const getProveeId = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await connectMysql.query("SELECT * FROM proveedores WHERE id = ?", [
            id,
        ]);

        if (rows.length <= 0) {
            return res.status(404).json({ message: "Proveedor no encontrado" });
        }

        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: "Ups, algo salio mal" });
    }
}
export const createProvee = async (req, res) => {
    try {
        const { name_empresa, name_encargado, telefono, direccion } = req.body;

        const [rows] = await connectMysql.query(
            "INSERT INTO proveedores (name_empresa, name_encargado, telefono, direccion) VALUES (?, ?, ?, ?)",
            [name_empresa, name_encargado, telefono, direccion]
        );
        res.status(201).json({ mensaje: "Nuevo Proveedor Creado", id: rows.insertId, name_empresa, name_encargado, telefono, direccion });
    } catch (error) {
        return res.status(500).json({ message: "Ups, algo salio mal" });
    }
}
export const updateProvee = async (req, res) => {
    try {
        const { id } = req.params;
        const { name_empresa, name_encargado, telefono, direccion } = req.body;

        const [result] = await connectMysql.query(
            "UPDATE proveedores SET name_empresa = IFNULL(?, name_empresa), name_encargado = IFNULL(?, name_encargado), telefono = IFNULL(?, telefono), direccion = IFNULL(?, direccion) WHERE id = ?",
            [name_empresa, name_encargado, telefono, direccion, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Empleado no encontrado" });
        }

        const [rows] = await connectMysql.query("SELECT * FROM proveedores WHERE id = ?", [id]);

        res.status(200).json({ mensaje: "Datos del Proveedor Actualizados", empleado: rows[0] });
    } catch (error) {
        return res.status(500).json({ message: "Ups, algo salió mal" });
    }
}
export const deleteProvee = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await connectMysql.query("DELETE FROM proveedores WHERE id = ?", [id]);

        if (rows.affectedRows <= 0) {
            return res.status(404).json({ message: "Proveedor no encontrado" });
        }

        return res.status(204).json({ message: "Proveedor eliminado exitosamente" });
    } catch (error) {
        return res.status(500).json({ message: "Ups, algo salió mal" });
    }
}