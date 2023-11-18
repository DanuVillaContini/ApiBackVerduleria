import { connectMysql } from "../db.js"

export const getEmpleados = async (req, res) => {
    try {
        const [rows] = await connectMysql.query("SELECT * FROM empleados");
        res.json(rows);
    } catch (error) {
        return res.status(500).json({ message: "Ups, algo salio mal" });
    }
}
export const getEmpleadosId = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await connectMysql.query("SELECT * FROM empleados WHERE id = ?", [
            id,
        ]);

        if (rows.length <= 0) {
            return res.status(404).json({ message: "Empleado no encontrado" });
        }

        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: "Ups, algo salio mal" });
    }
};

export const createEmpleados = async (req, res) => {
    try {
        const { name, apellido, telefono, correo } = req.body;

        const [rows] = await connectMysql.query(
            "INSERT INTO empleados (name, apellido, telefono, correo) VALUES (?, ?, ?, ?)",
            [name, apellido, telefono, correo]
        );
        res.status(201).json({ mensaje: "Nuevo Empleado Creado", id: rows.insertId, name, apellido, telefono, correo });
    } catch (error) {
        return res.status(500).json({ message: "Ups, algo salio mal" });
    }
}

export const updateEmpleados = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, apellido, telefono, correo } = req.body;

        const [result] = await connectMysql.query(
            "UPDATE empleados SET name = IFNULL(?, name), apellido = IFNULL(?, apellido), telefono = IFNULL(?, telefono), correo = IFNULL(?, correo) WHERE id = ?",
            [name, apellido, telefono, correo, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Empleado no encontrado" });
        }

        const [rows] = await connectMysql.query("SELECT * FROM empleados WHERE id = ?", [id]);

        res.status(200).json({ mensaje: "Datos del Empleado Actualizados", empleado: rows[0] });
    } catch (error) {
        return res.status(500).json({ message: "Ups, algo salió mal" });
    }
}


export const deleteEmpleados = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await connectMysql.query("DELETE FROM empleados WHERE id = ?", [id]);

        if (rows.affectedRows <= 0) {
            return res.status(404).json({ message: "Empleado no encontrado" });
        }

        return res.status(204).json({ message: "Empleado eliminado exitosamente" });
    } catch (error) {
        return res.status(500).json({ message: "Ups, algo salió mal" });
    }
}


