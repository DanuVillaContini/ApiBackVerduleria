import express from "express";
import morgan from "morgan";
import EmpleadosRoutes from "./routes/empleados.routes.js";
import IndexRoutes from "./routes/index.routes.js";
import ProveedoresRoutes from "./routes/proveedores.routes.js";
import ProductosRoutes from "./routes/productos.routes.js";
import StockRoutes from "./routes/stock.routes.js";
import ClientesRoutes from "./routes/clientes.routes.js";
import VentasRoutes from "./routes/ventas.routes.js";
import PedidosRoutes from "./routes/pedidos.routes.js";
import AcreedoresRoutes from "./routes/acreedores.routes.js";
import LoginRoutes from "./routes/auth.routes.js"
import cors from 'cors';

const app = express();

// Definir una lista blanca con las URLs permitidas
const whiteList = [
    'http://localhost:5173',
    'http://localhost:3000'
];

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

// Configuración del middleware CORS
app.use(cors({
    origin: whiteList,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204
}));

// Configuración del middleware Cache-Control
app.use((req, res, next) => {
    res.header('Cache-Control', 'no-store');
    next();
});

// Rutas
app.use('/', IndexRoutes);
app.use('/api', EmpleadosRoutes);
app.use('/proveedores', ProveedoresRoutes);
app.use('/productos', ProductosRoutes);
app.use('/stock', StockRoutes);
app.use('/clientes', ClientesRoutes);
app.use('/ventas', VentasRoutes);
app.use('/pedidos', PedidosRoutes);
app.use('/acreedores', AcreedoresRoutes);
app.use('/usuarios', LoginRoutes)
app.use((req, res, next) => {
    res.status(404).json({ message: "Not found" });
});

export default app;
