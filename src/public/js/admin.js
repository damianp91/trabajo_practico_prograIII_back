const cardsProductos = document.getElementsByClassName("index-ejs-producto");
const contenedorDetalles = document.getElementById("index-ejs-detalles-contenedor-producto");

function cambiarBooleanoProducto(productId, booleano) {
  fetch(`http://localhost:3000/api/products/${productId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      activo: booleano === 1 ? 0 : 1
    })
  })
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
      let productoInner = `
        <img src='${productoEncontrado.imagen}'/>
        <div id="index-ejs-detalles-sub-contenedor-producto" class="flex-col-center-center">
          <h5>${productoEncontrado.nombre}</h5>
          <div class="flex-row-center-center">
            <p>ID: ${productoEncontrado.id}</p>
            <p>$${productoEncontrado.precio}</p>
          </div>
          <div id="${productoEncontrado.activo === 1 ? "activo" : "inactivo"}">
            Producto ${productoEncontrado.activo === 1 ? "Activo" : "Inactivo"}
          </div>
          <div onclick="cambiarBooleanoProducto(${productoEncontrado.id}, ${productoEncontrado.activo})" id="${productoEncontrado.activo === 1 ? "desactivar-boton" : "activar-boton"}">
            ${productoEncontrado.activo === 1 ? "Desactivar" : "Activar"} producto
          </div>
        </div>
      `;
      contenedorDetalles.innerHTML = productoInner;
    }
  })
}

