import connection from "../database/db.js";

// Trae todos los productos
const selectAllProducts = () => {
  const sql = `SELECT * FROM productos`;

  return connection.query(sql);
}

// Eliminar producto
const deleteProduct = (id) => {
  let sql = `DELETE FROM productos WHERE id = ?`;

  return connection.query(sql, [id]);
}

// Crear producto
const insertProduct = (nombre, categoria, precio, imagen) => {
  let sql = `
    INSERT INTO productos (nombre, categoria, precio, imagen) VALUES (?, ?, ?, ?)
  `;

  return connection.query(sql, [nombre, categoria, precio, imagen]);
}

// Modificar producto
const updateProduct = (nombre, categoria, precio, imagen, id) => {
  let sql = `
    UPDATE productos
    SET nombre = ?, categoria = ?, precio = ?, imagen = ?
    WHERE id = ?
  `;

  return connection.query(sql, [nombre, categoria, precio, imagen, id]);
}

export default {
  selectAllProducts,
  deleteProduct,
  insertProduct,
  updateProduct
}
