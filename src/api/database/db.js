import mysql2 from "mysql2/promise";

import environments from "../config/environment.js";

const {database} = environments;

const connection = mysql2.createPool({
  host: database.host,
  database: database.name,
  user: database.user,
  password: database.password,
  // port: database.port
});

export default connection;

