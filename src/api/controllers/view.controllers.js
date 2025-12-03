import ProductModel from "../models/product.models.js";

export const vistaProductos = async (req, res) => {
  try {
    const [rows] = await ProductModel.selectAllProducts();
    res.render("index", {
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
