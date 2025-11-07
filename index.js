// NOTE: importaciones

// Se levanta express
import express from "express";
const app = express();

// Importacin de variables de entorno para puerto
import environments from "./src/api/config/environment.js";
const PORT = environments.port;

// Conexiones de BBDD para enviar sentencias sql
import connection from "./src/api/database/db.js";
import cors from "cors";

// WARN:  Middlewares
// cors() basico para permitir las solicitudes
// express.json() que transforma el JSON de las peticions POST a objects JS
app.use(cors());
app.use(express.json());

// NOTE: endpoints

app.get("/", (req, res) =>{
  res.send("Pagina principal");
})

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

