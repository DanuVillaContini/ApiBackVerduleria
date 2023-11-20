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

}
export const createPedidos = async (req, res) => {

}
export const updatePedidos = async (req, res) => {

}
export const deletePedidos = async (req, res) => {

}