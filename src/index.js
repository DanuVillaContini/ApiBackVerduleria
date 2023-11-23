import app from "./app.js"
import { PORT } from "./config.js"
import { iniciarSuperUsuarioDB } from "./utils/inicio.utils.js";

// Llama a la función para iniciar el superusuario antes de arrancar el servidor
iniciarSuperUsuarioDB()
    .then(() => {
        // Arranca el servidor después de crear o verificar el superusuario
        app.listen(PORT, () => {
            console.log(`Servidor iniciado en el puerto ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error al iniciar el superusuario:', error);
    });