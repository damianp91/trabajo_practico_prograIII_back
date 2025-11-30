const inputIdProducto = document.getElementById("input-id-producto");
const contenedorProductoEncontrado = document.getElementById("contenedor-producto-encontrado");
const BASE_URL = "http://localhost:4000/api/products";

// Función Principal: Buscar Producto por ID (Llamada desde el onclick)
async function buscarProductoPorId() {
  const id = inputIdProducto.value.trim();

  if (!id) {
    mostrarMensaje(`Por favor, ingrese un ID de producto.`, 'error');
    return;
  }

  // Limpiar y mostrar estado de búsqueda
  mostrarMensaje(`Buscando producto ID: ${id}...`, 'buscando');

  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "GET"
    });

    const result = await response.json();

    if (response.ok && result.payload && result.payload.length > 0) {
      const product = result.payload[0];
      mostrarProducto(product);
    } else {
      // Manejar errores 404 (el controlador de la API ya devuelve el mensaje)
      mostrarMensaje(`Error: Producto ID ${id} ${result.message || "no encontrado."}`, 'error');
    }

  } catch (error) {
    console.error("Error al consultar producto:", error);
    mostrarMensaje(`Error de conexión con el servidor.`, 'error');
  }
}


// Muestra la informacion del producto en el contenedor
function mostrarProducto(producto) {
  // Aseguramos que el contenedor se muestre
  contenedorProductoEncontrado.style.display = 'flex'; 

  contenedorProductoEncontrado.innerHTML = `
    <div class="card-producto">
      <div class="flex-row-center-around">
        <span>ID: ${producto.id}</span>
        <span>Estado: ${producto.activo === 1 ? "Activo" : "Inactivo"}</span>
      </div>

      <img src="${producto.imagen}" alt="${producto.nombre}"/>

      <div class="producto-detalles">
        <div class="ubicacion-detalles">
          <span>${producto.nombre}</span>
          <span>${producto.categoria}</span>
        </div>
        <p>$${producto.precio}</p>
      </div>
    </div>
  `;
}


// Helper: Muestra mensajes de error, éxito o búsqueda
function mostrarMensaje(mensaje, tipo) {
  // Aseguramos que el contenedor se muestre para el mensaje
  contenedorProductoEncontrado.style.display = 'flex'; 

  // Usamos las clases CSS que ya definimos ('error', 'buscando', 'exito' si existiera)
  contenedorProductoEncontrado.innerHTML = `
    <p class="mensaje ${tipo}">
      ${mensaje}
    </p>
  `;
}
