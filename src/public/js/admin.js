const cardsProductos = document.getElementsByClassName("index-ejs-producto");
const contenedorDetalles = document.getElementById("index-ejs-detalles-contenedor-producto");

async function cambiarBooleanoProducto(productId, booleano) {
  // 1. Ejecutar la actualización en el servidor
  const response = await fetch(`http://localhost:3000/api/products/${productId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      activo: booleano === 1 ? 0 : 1
    })
  });

  if (response.ok) {
    let respuestaServer = await response.json();
    renderizarDetalles(respuestaServer.payload);
  }
}

function renderizarDetalles(producto) {
  let productoInner = `
        <img src='${producto.imagen}'/>
        <div id="index-ejs-detalles-sub-contenedor-producto" class="flex-col-center-center">
          <h5>${producto.nombre}</h5>
          <div class="flex-row-center-center">
            <p>ID: ${producto.id}</p>
            <p>$${producto.precio}</p>
          </div>
          <div id="${producto.activo === 1 ? "activo" : "inactivo"}">
            Producto ${producto.activo === 1 ? "Activo" : "Inactivo"}
          </div>
          
          <div onclick="cambiarBooleanoProducto(${producto.id}, ${producto.activo})" 
               id="${producto.activo === 1 ? "desactivar-boton" : "activar-boton"}">
            ${producto.activo === 1 ? "Desactivar" : "Activar"} producto
          </div>
        </div>
      `;
  contenedorDetalles.innerHTML = productoInner;
}

for (const card of cardsProductos) {
  card.addEventListener("click", () => {

    let idSelectedProduct = Number(
      card.children[1].children[1].children[1].textContent.slice(4)
    );

    let productoEncontrado = productosData.find(
      (prod) => idSelectedProduct === prod.id
    );

    if (productoEncontrado) {
      renderizarDetalles(productoEncontrado);
    }
  });
}

