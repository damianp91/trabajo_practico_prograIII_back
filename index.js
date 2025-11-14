// NOTE: importaciones

// Se levanta express
import express from "express";
const app = express();

// Importacin de variables de entorno para puerto
import environments from "./src/api/config/environment.js";
const PORT = environments.port;

// Conexiones de BBDD para enviar sentencias sql
// import connection from "./src/api/database/db.js";
import cors from "cors";

// WARN:  Middlewares
import { loggerUrl } from "./src/api/middlewares/middlewares.js";
import { productRoutes } from "./src/api/routes/index.js";

app.use(cors());
app.use(express.json());
app.use(loggerUrl);

// Rutas
app.use("/api/products", productRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

