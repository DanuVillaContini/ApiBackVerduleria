import express from "express";
import morgan from "morgan";

import EmpleadosRoutes from "./routes/empleados.routes.js"
import IndexRoutes from "./routes/index.routes.js"
import ProveedoresRoutes from "./routes/proveedores.routes.js"
import ProductosRoutes from "./routes/productos.routes.js"
import StockRoutes from "./routes/stock.routes.js"


const app = express()

// Middlewares
app.use(morgan("dev"));
app.use(express.json())

//Routes
app.use(IndexRoutes)
app.use('/api', EmpleadosRoutes)
app.use('/proveedores', ProveedoresRoutes)
app.use('/productos', ProductosRoutes)
app.use('/stock', StockRoutes)


app.use((req, res, next) => {
    res.status(404).json({ message: "Not found" });
});

export default app;