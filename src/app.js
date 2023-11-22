import express from "express";
import morgan from "morgan";

import EmpleadosRoutes from "./routes/empleados.routes.js"
import IndexRoutes from "./routes/index.routes.js"
import ProveedoresRoutes from "./routes/proveedores.routes.js"
import ProductosRoutes from "./routes/productos.routes.js"
import StockRoutes from "./routes/stock.routes.js"
import ClientesRoutes from "./routes/clientes.routes.js"
import VentasRoutes from "./routes/ventas.routes.js"
import PedidosRoutes from "./routes/pedidos.routes.js"
import AcreedoresRoutes from "./routes/acreedores.routes.js"

import cors from 'cors';

const app = express()
app.use(cors())

// Middlewares
app.use(morgan("dev"));
app.use(express.json())

//Routes
app.use(IndexRoutes)
app.use('/api', EmpleadosRoutes)
app.use('/proveedores', ProveedoresRoutes)
app.use('/productos', ProductosRoutes)
app.use('/stock', StockRoutes)
app.use('/clientes', ClientesRoutes)
app.use('/ventas', VentasRoutes)
app.use('/pedidos', PedidosRoutes)
app.use('/acreedores', AcreedoresRoutes)



app.use((req, res, next) => {
    res.status(404).json({ message: "Not found" });
});

export default app;