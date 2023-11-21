import { connectMysql } from "../db.js"

export const getAcreedores = async (req, res) => {
    try {
        const [rows] = await connectMysql.query(`
            SELECT acreedores.*, clientes.name_apellido as acreedor_name
            FROM acreedores
            JOIN clientes ON acreedores.clientes_id = clientes.id
        `);
        res.json(rows);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Ups, algo salió mal al obtener los acreedores" });
    }
};
export const getAcreedoresId = async (req, res) => {
    try {
        const { id } = req.params;

        const [rows] = await connectMysql.query(`
            SELECT acreedores.*, clientes.name_apellido as acreedor_name
            FROM acreedores
            JOIN clientes ON acreedores.clientes_id = clientes.id
            WHERE acreedores.id = ? 
        `, [id]);

        if (rows.length === 0) {
            return res.status(404).json({ message: "Acreedor no encontrado" });
        }

        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Ups, algo salió mal al obtener el acreedor por ID" });
    }
};
// clientes_id

// total_deudor
export const createAcreedores = async (req, res) => {
    try {
        const { clientes_id, ventas_id, total_deudor } = req.body;

        const [result] = await connectMysql.query(
            "INSERT INTO acreedores (clientes_id, ventas_id, total_deudor) VALUES (?, ?, ?)",
            [clientes_id, ventas_id, total_deudor]
        );

        const insertedId = result.insertId;

        const [newRow] = await connectMysql.query("SELECT * FROM acreedores WHERE id = ?", [insertedId]);

        res.status(201).json({ mensaje: "Acreedor creado correctamente", acreedor: newRow[0] });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Ups, algo salió mal al crear el acreedor" });
    }
};

export const updateAcreedores = async (req, res) => {
    try {
        const { id } = req.params;
        const { clientes_id, ventas_id, total_deudor } = req.body;

        const [result] = await connectMysql.query(
            "UPDATE acreedores SET clientes_id = ?, ventas_id = ?, total_deudor = ? WHERE id = ?",
            [clientes_id, ventas_id, total_deudor, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Acreedor no encontrado" });
        }

        const [updatedRow] = await connectMysql.query("SELECT * FROM acreedores WHERE id = ?", [id]);

        res.status(200).json({ mensaje: "Acreedor actualizado correctamente", acreedores: updatedRow[0] });
    } catch (error) {
        return res.status(500).json({ message: "Ups, algo salió mal al actualizar el Ventas" });
    }
}
export const deleteAcreedores = async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await connectMysql.query("DELETE FROM acreedores WHERE id = ?", [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Acreedor no encontrada o ya fue eliminada" });
        }

        res.status(200).json({ message: "Acreedor eliminada correctamente" });
    } catch (error) {
        console.error("Error al eliminar la acreedores:", error);
        return res.status(500).json({ message: "Ups, algo salió mal al eliminar la acreedor" });
    }
}