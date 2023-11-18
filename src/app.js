import express from "express";
import morgan from "morgan";

import EmpleadosRoutes from "./routes/empleados.routes.js"
import IndexRoutes from "./routes/index.routes.js"

const app = express()

// Middlewares
app.use(morgan("dev"));
app.use(express.json())

//Routes
app.use(IndexRoutes)
app.use('/api', EmpleadosRoutes)


app.use((req, res, next) => {
    res.status(404).json({ message: "Not found" });
});

export default app;