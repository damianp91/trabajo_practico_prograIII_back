// Uso esta importacion ya que me permite usar async/await en lugar de callbacks
import mysql2 from "mysql2/promise";

import environments from "../config/environment.js";

const {database} = environments;

// En vez de abrir y cerrar conexiones por consulta, se mantiene un pool de conexiones
// para hacer mas eficiente el programa
const connection = mysql2.createPool({
  host: database.host,
  database: database.name,
  user: database.user,
  password: database.password,
  port: database.port
});

export default connection;

