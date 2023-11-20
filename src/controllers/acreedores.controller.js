import { connectMysql } from "../db.js"

export const getAcreedores = async (req, res) => {
    try {
        const [rows] = await connectMysql.query("SELECT * FROM acreedores");
        res.json(rows);
    } catch (error) {
        return res.status(500).json({ message: "Ups, algo salio mal" });
    }
}
export const getAcreedoresId = async (req, res) => {

}
export const createAcreedores = async (req, res) => {

}
export const updateAcreedores = async (req, res) => {

}
export const deleteAcreedores = async (req, res) => {

}