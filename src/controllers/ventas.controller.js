import { connectMysql } from "../db.js";

export const getVentas = async (req, res) => {
    try {
        const [rows] = await connectMysql.query("SELECT ventas.*, clientes.name_apellido as venta_nameCliente FROM ventas JOIN clientes ON ventas.clientes_id = clientes.id");
        res.json(rows);
    } catch (error) {
        return res.status(500).json({ message: "Ups, algo salió mal" });
    }
};

export const getVentasId = async (req, res) => {
    try {
        const { id } = req.params;

        const [rows, fields] = await connectMysql.query(`
            SELECT ventas.*, clientes.name_apellido as venta_nameCliente FROM ventas 
            JOIN clientes ON ventas.clientes_id = clientes.id
            WHERE ventas.id = ?  -- Cambiado de num_venta a id
        `, [id]);

        if (rows.length <= 0) {
            return res.status(404).json({ message: "Venta no encontrada" });
        }

        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Ups, algo salió mal" });
    }
};


export const createVentas = async (req, res) => {
    try {
        const { clientes_id, total } = req.body;

        const [result] = await connectMysql.query(
            "INSERT INTO ventas (clientes_id, total) VALUES (?, ?)",
            [clientes_id, total]
        );

        const insertedId = result.insertId;

        const [newRow] = await connectMysql.query("SELECT * FROM ventas WHERE id = ?", [insertedId]);

        res.status(201).json({ mensaje: "Venta creada correctamente", venta: newRow[0] });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Ups, algo salió mal al crear la venta" });
    }
};

export const updateVentas = async (req, res) => {
    try {
        const { id } = req.params;
        const { clientes_id, total } = req.body;

        const [result] = await connectMysql.query(
            "UPDATE ventas SET clientes_id = ?, total = ? WHERE id = ?",
            [clientes_id, total, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Venta no encontrado" });
        }

        const [updatedRow] = await connectMysql.query("SELECT * FROM ventas WHERE id = ?", [id]);

        res.status(200).json({ mensaje: "Ventas actualizado correctamente", ventas: updatedRow[0] });
    } catch (error) {
        return res.status(500).json({ message: "Ups, algo salió mal al actualizar el Ventas" });
    }
};

export const deleteVentas = async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await connectMysql.query("DELETE FROM ventas WHERE id = ?", [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Venta no encontrada o ya fue eliminada" });
        }

        res.status(200).json({ message: "Venta eliminada correctamente" });
    } catch (error) {
        console.error("Error al eliminar la venta:", error);
        return res.status(500).json({ message: "Ups, algo salió mal al eliminar la venta" });
    }
};