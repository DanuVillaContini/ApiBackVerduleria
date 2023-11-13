import express from "express";
import {connectMysql} from './constants/db.js'
import {PORT} from "./constants/config.js"

const app = express()

app.get('/', async  (req, res) => {
    const [rows] = await connectMysql.query('SELECT * FROM empleados')
    res.json(rows)
})
app.get('/ping' , async (req, res) => {
    const [result] = await connectMysql.query('SELECT "hello word" as RESULT');
    res.json(result[0])
})
app.get('/create', async (req, res) => {
    const result = await connectMysql.query('INSERT INTO empleados(name) VALUES ("Jhon")')
    res.json(result)

})
app.listen(PORT)
console.log('server on port', PORT)