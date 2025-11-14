
// logger
const loggerUrl = (req, res, next) => {
  console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.url}`);
  next();
}

// rutas
const validateId = (req, res, next) => {
  let {id} = req.params;

  // validacion de numero
  if (!id || isNaN(Number(id))) {
    return res.status(400).json({
      message: "El id del producto debe ser un numero valido"
    });
  }

  // parseo del numero de String a entero
  req.id = parseInt(id, 10);

  console.log("id valido: ", req.id);
  next();
}

export {
  loggerUrl,
  validateId
}
