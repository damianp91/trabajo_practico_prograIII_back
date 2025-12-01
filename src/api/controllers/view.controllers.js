import ProductModel from "../models/product.models.js";
import connection from "../database/db.js";
import bcrypt from 'bcrypt';


export const vistaProductos = async (req, res) => {
  if (!req.session.user) {
    return res.redirect("login")
  }
  try {
    const [rows] = await ProductModel.selectAllProducts();
    res.render("index", {
      title: "Productos",
      productos: rows
    });

  } catch (e) {
    console.error(e);
    res.status(500).send({
      message: "Error interno de servidor",
      error: e.message
    });
  }
}

export const loginAcceso = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.render("login", {
        title: "login",
        error: "Todos los campos son necesarios"
      })
    }
    const sql = `SELECT * FROM usuarios where email = ?`
    const [rows] = await connection.query(sql, [email]);

    if (rows.length === 0) {
      return res.render("login", {
        title: "login",
        error: "error: mail o password invalidos"
      })
    }

    const user = rows[0];
    const match = await bcrypt.compare(password, user.password);

    if (match) {
      // guardamos la session
      req.session.user = {
        id: user.id,
        name: user.name,
        email: user.email
      }
      // una vez que guardamos la sesion, vamos a redireccionar al dashboard
      res.redirect("/");
    } else {
      return res.render("login", {
        title: "Login",
        error: "Contraseña incorrecta"
      })
    }
  } catch (error) {
    res.status(500).json({
      error: "Error interno del servidor"
    })
  }
}

export const cerrarSesion = (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      console.log("Error al destruir la sesion", error);
      return res.status(500).json({
        error: "Error al cerrar la sesion"
      })
    }
    res.redirect("/login");
  })
}