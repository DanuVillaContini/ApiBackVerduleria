import { connectMysql } from "../db.js"

export const  getVentas = async (req, res) => {
    try {
        const [rows] = await connectMysql.query("SELECT * FROM ventas");
        res.json(rows);
    } catch (error) {
        return res.status(500).json({ message: "Ups, algo salio mal" });
    }
}
export const  getVentasId = async (req, res) => {

}
export const  createVentas = async (req, res) => {

}
export const  updateVentas = async (req, res) => {

}
export const  deleteVentas = async (req, res) => {

}