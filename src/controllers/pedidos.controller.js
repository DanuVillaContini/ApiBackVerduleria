import { connectMysql } from "../db.js"


export const getPedidos = async (req, res) => {
    try {
        const [rows] = await connectMysql.query("SELECT * FROM pedidos");
        res.json(rows);
    } catch (error) {
        return res.status(500).json({ message: "Ups, algo salio mal" });
    }
}
export const getPedidosId = async (req, res) => {
    try {
        const { id } = req.params;

        const [rows] = await connectMysql.query(`
            SELECT pedidos.*, clientes.name_apellido as clientes_id FROM pedidos JOIN clientes ON pedidos.clientes_id = clientes.id
            WHERE pedidos.id = ?
        `, [id]);

        if (rows.length <= 0) {
            return res.status(404).json({ message: "Pedido no encontrado" });
        }

        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: "Ups, algo salió mal" });
    }
}
// clientes_id
// total
export const createPedidos = async (req, res) => {
    try {
        const { clientes_id, total } = req.body;

        const [result] = await connectMysql.query(
            "INSERT INTO pedidos (clientes_id, total) VALUES (?, ?)",
            [clientes_id, total]
        );

        const insertedId = result.insertId;

        const [newRow] = await connectMysql.query("SELECT * FROM pedidos WHERE id = ?", [insertedId]);

        res.status(201).json({ mensaje: "Pedido creada correctamente", pedido: newRow[0] });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Ups, algo salió mal al crear la pedido" });
    }
}
export const updatePedidos = async (req, res) => {
    try {
        const { id } = req.params;
        const { clientes_id, total } = req.body;

        const [result] = await connectMysql.query(
            "UPDATE pedidos SET clientes_id = ?, total = ? WHERE id = ?",
            [clientes_id, total, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Pedido no encontrado" });
        }

        const [updatedRow] = await connectMysql.query("SELECT * FROM pedidos WHERE id = ?", [id]);

        res.status(200).json({ mensaje: "Pedido actualizado correctamente", pedidos: updatedRow[0] });
    } catch (error) {
        return res.status(500).json({ message: "Ups, algo salió mal al actualizar el pedidos" });
    }
}
export const deletePedidos = async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await connectMysql.query("DELETE FROM pedidos WHERE id = ?", [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Pedido no encontrada o ya fue eliminada" });
        }

        res.status(200).json({ message: "Pedido eliminada correctamente" });
    } catch (error) {
        console.error("Error al eliminar la Pedido:", error);
        return res.status(500).json({ message: "Ups, algo salió mal al eliminar la Pedido" });
    }
}