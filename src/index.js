import express from "express";
import { PORT } from "./config.js";
import EmpleadosRoutes from "./routes/empleados.routes.js"
import IndexRoutes from "./routes/index.routes.js"


const app = express()

app.use(express.json())
// Middlewares



//Routes
app.use('/api',EmpleadosRoutes)
app.use(IndexRoutes)

//ejecutar las peticiones antes de que lleguen --> con Morgan
// app.use(morgan('dev'));

app.listen(PORT)
console.log('server on port', PORT)