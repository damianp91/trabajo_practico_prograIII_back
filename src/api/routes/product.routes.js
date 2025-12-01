// Usamos express para manejar nuestras rutas
import { Router } from "express";
const router = Router();

// Importacion de middlewares
import {
  validateId,
  validatePrice,
  validateCategory 
} from "../middlewares/middlewares.js";
import {
  getAllProducts,
  removeProduct,
  createProduct,
  updateProduct,
  getProductById,
  getProductByCategory,
  updateProductStatus
} from "../controllers/product.controllers.js";

router.get("/", getAllProducts);
router.get("/:categoria/categoria", validateCategory, getProductByCategory);
router.get("/:id", validateId, getProductById);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id/eliminar", validateId, removeProduct);
router.patch('/:id', validateId, updateProductStatus);

export default router;
