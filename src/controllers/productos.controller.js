import { connectMysql } from "../db.js"


export const getProductos = async (req, res) => {
    try {
        const [rows] = await connectMysql.query("SELECT * FROM productos");
        res.json(rows);
    } catch (error) {
        return res.status(500).json({ message: "Ups, algo salio mal" });
    }
}
export const getProductosId = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await connectMysql.query("SELECT * FROM productos WHERE id = ?", [
            id,
        ]);

        if (rows.length <= 0) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: "Ups, algo salio mal" });
    }
};

export const createProductos = async (req, res) => {
    try {
        const { name, tipo } = req.body;

        const [rows] = await connectMysql.query(
            "INSERT INTO productos (name, tipo) VALUES (?, ?)",
            [name, tipo]
        );
        
        res.status(201).json({ mensaje: "Nuevo Producto Creado", id: rows.insertId, name, tipo });
    } catch (error) {
        return res.status(500).json({ message: "Ups, algo salio mal" });
    }
}

export const updateProductos = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, tipo } = req.body;

        const [result] = await connectMysql.query(
            "UPDATE productos SET name = IFNULL(?, name), tipo = IFNULL(?, tipo) WHERE id = ?",
            [name, tipo, id]
        );
        

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        const [rows] = await connectMysql.query("SELECT * FROM productos WHERE id = ?", [id]);

        res.status(200).json({ mensaje: "Datos del Producto Actualizados", producto: rows[0] });
    } catch (error) {
        return res.status(500).json({ message: "Ups, algo salió mal" });
    }
}


export const deleteProductos = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await connectMysql.query("DELETE FROM productos WHERE id = ?", [id]);

        if (rows.affectedRows <= 0) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        return res.status(204).json({ message: "Producto eliminado exitosamente" });
    } catch (error) {
        return res.status(500).json({ message: "Ups, algo salió mal" });
    }
}


