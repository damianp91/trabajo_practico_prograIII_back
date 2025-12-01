// NOTE: importaciones

// Se levanta express
import express from "express";
const app = express();

// importacion de session-express para el login
import session from "express-session";

// Importacin de variables de entorno para puerto
import environments from "./src/api/config/environment.js";
const PORT = environments.port;
const session_key = environments.session_key;

// HACK: (Cross-Origin Resource Sharing) esto permite que el fronted en otro dominio
// consuma mi API. Sin esto, los navegadores bloquean mis peticiones
import cors from "cors";

// WARN:  Middlewares
import { loggerUrl } from "./src/api/middlewares/middlewares.js";
import { productRoutes, userRoutes, viewRoutes } from "./src/api/routes/index.js";
import { join, __dirname } from "./src/api/utils/index.js";

app.use(cors());
app.use(express.json());
app.use(loggerUrl);
app.use(express.urlencoded({ extended: true }));

// middlewares para servir archivos estaticos
app.use(express.static(join(__dirname, "src/public")));

// Middleware para parsear info de un <form>
// Middleware necesario para leer formularios HTML <form method="POST">
app.use(express.urlencoded({
  extended: true
}));

// middleware de session
app.use(session({
  secret: session_key, // firma las cookies
  resave: false, // evita guardar la sesion si no hubo cambios
  saveUninitialized: true // no guarda sesiones vacias
}))

// configuracion de ejs
app.set("view engine", "ejs");
app.set("views", join(__dirname, "src/views"));

// Rutas que comiencen con api/products seran controladas por productRoutes
app.use("/api/products", productRoutes);
app.use("/", viewRoutes);
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

