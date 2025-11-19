// NOTE: Codigos de estado HTTP:
// 200 --> OK (exito)
// 201 --> Created (recurso creado)
// 400 --> Bad Request (datos invalidos de cliente)
// 404 --> Not Found (Recurso no existente)
// 500 --> Internal Server Error (error del servidor)

import ProductModel from "../models/product.models.js";

// Controlador para traer todos los productos
export const getAllProducts = async (req, res) => {
  try {
    // recordar que con rows solo se pide las consultas necesarias
    const [rows] = await ProductModel.selectAllProducts();

    res.status(200).json({
      payload: rows,
      message: rows.length === 0 ? "No se encontraron productos" : "Productos encontrados"
    });
  } catch (e) {
    console.error("Error obteniendo productos", e.message);

    res.status(500).json({
      message: "Error al obtener productos."
    })
  }
}

// Controlador para eliminar productos
export const removeProduct = async (req, res) => {
  try {
    let { id } = req.params;

    let [result] = await ProductModel.deleteProduct(id);
    console.log(result);

    if(result.affectedRows === 0) { // No se borro nada
      return res.status(400).json({
        message: "No se eliminó el producto"
      });
    }

    return res.status(200).json({
      message: `Producto con id ${id} eliminado correctamente`
    });

  } catch(e) {
    console.error("Error al eliminar un producto: ", e);

    res.status(500).json({
      message: `Error al eliminar un producto con id ${id}: `, e,
      error: e.message
    })
  }
}

// Controladora para crear productos
export const createProduct = async (req, res) => {
  try {
    /*
     * nombre
     * categoria
     * precio
     * imagen
     * */
    let { nombre, categoria, precio, imagen } = req.body;
    console.log(req.body);

    if (!nombre || !categoria || !precio || !imagen) {
      return res.status(400).json({
        message: "Datos invalidos, deben completarse todos los campos."
      });
    }

    let [result] = await ProductModel.insertProduct(nombre, categoria, precio, imagen);
    console.log(result);

    // Codigo 201 para confirmar creacion
    res.status(201).json({
      message: "Producto creado correctamente.",
      productId: result.insertId
    });

  } catch (e) {
    console.error(e);

    res.status(500).json({
      message: "Error interno en el servidor.",
      error: e.message
    });
  }
}

// Controladora para actualizar producto
export const updateProduct = async (req, res) => {
  try {
    let {id, nombre, categoria, precio, imagen} = req.body;

    if (!id || !nombre || !categoria || !precio || !imagen) {
      return res.status(400).json({
        message: "Datos invalidos, deben completarse todos los campos."
      });
    }

    let [result] = await ProductModel.updateProduct(nombre, categoria, precio, imagen, id);
    console.log(result);

    // test para confirmar actualizacion
    if (result.affectedRows === 0) {
      return res.status(400).json({
        message: "No se actualizo el producto"
      });
    }

    res.status(200).json({
      message: `El producto con id ${id} actualizado cotrrectamente.`
    });

  } catch (e) {
    console.error("Error al actualizar el producto", e);

    res.status(500).json({
      message: "Error interno del servidor. ", e
    });
  }
}

// Controladora para busscar producto por id
export const getProductById = async (req, res) => {
  try {
    let { id } = req.params;
    let [rows] = await ProductModel.selectProductById(id);

    if (rows.length === 0) {
      console.log(`Error! No se encontro el producto con id: ${id}`)

      return res.status(404).json({
        message: `No se encontro producto con id: ${id}`
      });
    }

    res.status(200).json({
      payload: rows,
      message: "Producto encontrado"
    });

  } catch (e) {
    console.error(`Error obteniendo producto con id: ${id}`, e.message);

    res.status(500).json({
      message: "Error al obtener producto con id"
    });
  }
}

// Controladora para mostrar productos por categoria
export const getProductByCategory = async (req, res) => {
  try {
    let { categoria } = req.params;
    let [rows] = await ProductModel.selectProductByCategory(categoria);

    res.status(200).json({
      payload: rows,
      message: rows.length === 0
        ? `No se encontraron productos en la categoria ${categoria}`
        : `Se encontraron ${rows.length} productos en la categoria ${categoria}`
    });
  } catch (e) {
    console.error("Error obteniendo productos por categoria", e.message);

    res.status(500).json({
      message: "Error al obtener productos por categoria."
    })
  }
}
