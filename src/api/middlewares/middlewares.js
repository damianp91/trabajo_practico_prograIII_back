// NOTE: middlewares
// funciones intermedias
// req : Objeto con info de la peticion (body, params, headers)
// res: Objeto que se usa para enviar las respuestas
// next: Crucial pasa el control al siguiente middleware, sin esto la peticion queda
//       congelada
// Flujo: Cliente --> loggerUrl() --> next() --> validateId() --> next() --> controlador

// logger
const loggerUrl = (req, res, next) => {
  console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.url}`);
  next();
}

// validacion id
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

// validacion de precio
const validatePrice = (req, res, next) => {
  const { precio } = req.params;

  // Verificar que precio exista, sea un numero y que sea positivo
  if (!precio || isNaN(Number(precio)) || isNaN(Number(precio)) < 0) {
    return res.status(400).json({
      message: "El precio es obligatorio y debe ser un numero mayor o igual a cero"
    });
  }

  req.precio = parseFloat(precio, 10);

  console.log("precio valido: ", req.precio);
  next();
}

export {
  loggerUrl,
  validateId,
  validatePrice
}
