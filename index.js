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

/* ============= ENDPOINT CREAR PRODUCTOS =============== */

app.post("/productos", async (req, res) => {
    try {
        let { nombre, categoria, precio, imagen } = req.body;

        let sql = "INSERT INTO productos (nombre, categoria, precio, imagen) VALUES (?, ?, ?, ?)";

        let [rows] = await connection.query(sql, [nombre, categoria, precio, imagen]);

        res.status(201).json({
            message: "Producto creado exitosamente"
        });

    } catch (e) {
        console.error(e);

        res.status(500).json({
            message: "Error interno del servidor",
            error: e.message
        })
    }
})

////////////////////////////////////////////////////////////////////

/* ================== ENDPOINT MODIFICAR PRODUCTOS ================= */

app.put("/productos/:id", async (req, res) => {
    try {
      console.log(req.params, req.body)

        let { id } = req.params;

        let { nombre, categoria, precio, imagen } = req.body;

        let sql = `UPDATE productos SET nombre = ?, categoria = ?, precio = ?, imagen = ? WHERE id = ?`;

        let [rows] = await connection.query(sql, [nombre, categoria, precio, imagen, id]);

        res.status(201).json({
            message: "Producto modificado exitosamente"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Error interno del servidor",
            error: error.message
        })
    }
})

/* ================================================================= */

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

