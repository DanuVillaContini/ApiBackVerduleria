import { connectMysql } from "../db.js"


export const getStock = async (req, res) => {
    try {
        const [rows] = await connectMysql.query(`
            SELECT stock.*, productos.name as productName, productos.tipo as productTipo
            FROM stock
            JOIN productos ON stock.ProductoId = productos.id
        `);

        res.json(rows);
    } catch (error) {
        return res.status(500).json({ message: "Ups, algo salió mal" });
    }
};

export const getStockId = async (req, res) => {
    try {
        const { id } = req.params;

        const [rows] = await connectMysql.query(`
            SELECT stock.*, productos.name as productName, productos.tipo as productTipo
            FROM stock
            JOIN productos ON stock.ProductoId = productos.id
            WHERE stock.id = ?
        `, [id]);

        if (rows.length <= 0) {
            return res.status(404).json({ message: "Stock no encontrado" });
        }

        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: "Ups, algo salió mal" });
    }
};


export const createStock = async (req, res) => {
    try {
        const { ProductoId, Cantidad } = req.body;

        const [result] = await connectMysql.query(
            "INSERT INTO stock (ProductoId, Cantidad) VALUES (?, ?)",
            [ProductoId, Cantidad]
        );

        const insertedId = result.insertId;

        const [newRow] = await connectMysql.query("SELECT * FROM stock WHERE id = ?", [insertedId]);

        res.status(201).json({ mensaje: "Stock creado correctamente", stock: newRow[0] });
    } catch (error) {
        return res.status(500).json({ message: "Ups, algo salió mal al crear el stock" });
    }
}

export const updateStock = async (req, res) => {
    try {
        const { id } = req.params;
        const { ProductoId, Cantidad } = req.body;

        const [result] = await connectMysql.query(
            "UPDATE stock SET ProductoId = ?, Cantidad = ? WHERE id = ?",
            [ProductoId, Cantidad, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Stock no encontrado" });
        }

        const [updatedRow] = await connectMysql.query("SELECT * FROM stock WHERE id = ?", [id]);

        res.status(200).json({ mensaje: "Stock actualizado correctamente", stock: updatedRow[0] });
    } catch (error) {
        return res.status(500).json({ message: "Ups, algo salió mal al actualizar el stock" });
    }
}

export const deleteStock = async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await connectMysql.query("DELETE FROM stock WHERE id = ?", [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Stock no encontrado" });
        }

        res.status(200).json({ mensaje: "Stock eliminado correctamente" });
    } catch (error) {
        return res.status(500).json({ message: "Ups, algo salió mal al eliminar el stock" });
    }

}