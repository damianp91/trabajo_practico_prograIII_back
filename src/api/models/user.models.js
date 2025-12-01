import connection from "../database/db.js";

const insertUser = (nombre, email, password) => {
    const sql = `INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)`
    return connection.query(sql, [nombre, email, password]);
}

export default {
    insertUser
}