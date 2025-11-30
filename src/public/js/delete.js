const inputIdProducto = document.getElementById("input-id-producto");
const contenedorProductoEncontrado = document.getElementById("contenedor-producto-encontrado");
const BASE_URL = "http://localhost:4000/api/products";

// Buscar Producto por ID (Llamada desde el onclick)
async function buscarProductoPorId() {
  const id = inputIdProducto.value.trim();

  if (!id) {
    contenedorProductoEncontrado.innerHTML = `
      <p class="mensaje error">
        Por favor, ingrese un ID de producto.
      </p>
    `;
    return;
  }

  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });

    const result = await response.json();

    if (response.ok && result.payload && result.payload.length > 0) {
      const product = result.payload[0];
      mostrarProductoParaEliminar(product);
    } else {
      // Manejar errores 404
      contenedorProductoEncontrado.innerHTML = `
        <p class="mensaje error">
          Error: Producto ID ${id} ${result.message || "no encontrado."}
        </p>
      `;
    }

  } catch (error) {
    console.error("Error al consultar producto:", error);
    contenedorProductoEncontrado.innerHTML = `
      <p class="mensaje error">
        Error de conexión con el servidor.
      </p>
    `;
  }
}

// Funcion mostrar el producto y boton de confirmacion (Helper)
function mostrarProductoParaEliminar(producto) {
  contenedorProductoEncontrado.innerHTML = `
    <div class="card-producto">
      <div class="flex-row-center-around">
        <span>ID: ${producto.id}</span>
        <span>Estado: ${producto.activo === 1 ? "Activo" : "Inactivo"}</span>
      </div>
      <img src="${producto.imagen}"/>
      <div class="producto-detalles">
        <div class="ubicacion-detalles"
          <span>${producto.nombre}</span>
          <span>${producto.categoria}</span>
        </div>
        <p>$${producto.precio}</p>
      </div>
    </div>
    <div id="boton-eliminar-producto" class="posicio-boton-eliminar" onclick="confirmarEliminacion(${producto.id})">
        <button>Confirmar Eliminación</button>
    </div>
  `;
}

//  Funcion 3: eliminar el Producto (DELETE)
async function confirmarEliminacion(id) {
  // Mostrar un estado de carga mientras se elimina
  contenedorProductoEncontrado.innerHTML = `
    <p class="mensaje buscando">
      Eliminando producto ID: ${id}...
    </p>
  `;

  try {
    const response = await fetch(`${BASE_URL}/${id}/eliminar`, {
      method: "DELETE" // Método DELETE
    });

    const result = await response.json();

    if (response.ok) {
      // exito: Mostrar mensaje y limpiar el input
      inputIdProducto.value = '';
      contenedorProductoEncontrado.innerHTML = `
        <p class="mensaje exito">
          ${result.message}
        </p>
      `;
    } else {
      // error en la API
      contenedorProductoEncontrado.innerHTML = `
        <p class="mensaje error">
          Error al eliminar: ${result.message || 'Error desconocido.'}
        </p>
      `;
    }

  } catch (error) {
    console.error("Error de conexión al eliminar:", error);
    contenedorProductoEncontrado.innerHTML = `
      <p class="mensaje error">
        Error de conexión con el servidor.
      </p>
    `;
  }
} 
