const idProducto = document.getElementById("input-id-producto");
const contenedorProducto = document.getElementById("contenedor-producto-encontrado");
const contenedorMain = document.getElementById("main-modificar-productos");
const modal = document.getElementById("modal-container");

async function buscarProductoPorId() {
  try {
    let respuesta = await fetch(`http://localhost:3000/api/products/${idProducto.value}`);
    let data = await respuesta.json();
    let producto = data.payload[0];

    contenedorProducto.innerHTML = `
      <div class='flex-row-center-around' id='producto-id-activo'>
        <span>ID: ${producto.id}</span>
        <span>Estado: ${producto.activo === 1 ? "Activo" : "Inactivo"}</span>
      </div>
      <img src="${producto.imagen}"/>
      <div class='flex-col-center-center'>
        <div class='flex-row-center-around' id='producto-id-activo'>
          <span>${producto.nombre}</span>
          <span>${producto.categoria}</span>
        </div>
        <p>$${producto.precio}</p>
        <div id="boton-mostrar-modificacion" class='flex-col-center-center' onclick='verModificacionProducto(${JSON.stringify(producto)})'>
    Modificar producto
        </div>
      </div>
    `;

    contenedorProducto.style.display = 'flex';

  } catch (error) {
    console.error("Error interno en el servidor", error);
  }
}

async function verModificacionProducto(producto) {
  contenedorMain.innerHTML = `
    <h1>Modificar producto</h1>
    <form class="flex-col-center-center formulario-productos" id="formulario-modificar-productos">
      <div class="flex-row-start-center">
        <label for="nombre">Nombre</label>
        <input name="nombre" value="${producto.nombre}" id="nombre" type="text">
      </div>
      <div class="flex-row-start-center">
        <label for="categoria">Categoria</label>
        <select value="${producto.categoria}" name="categoria" id="categoria">
          <option ${producto.categoria === "medicamento" && "selected"} value="medicamento">Medicamento</option>
          <option ${producto.categoria === "crema" && "selected"} value="crema">Crema</option>
        </select>
      </div>
      <div class="flex-row-start-center">
        <label for="precio">Precio</label>
        <input value="${producto.precio}" name="precio" id="precio" type="number">
      </div>
      <div class="flex-row-start-center">
        <label for="imagen">Imagen</label>
        <input value="${producto.imagen}" name="imagen" id="imagen" type="text">
      </div>
      <button type="submit">Modificar</button>
    </form>
  `;

  const formularioModificarProducto = document.getElementById("formulario-modificar-productos");

  formularioModificarProducto.addEventListener("submit", async (e) => {

    e.preventDefault();
    let formData = new FormData(e.target);
    let data = Object.fromEntries(formData.entries());

    try {
      let response = await fetch(`http://localhost:3000/api/products/${idProducto.value}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })

      if (response.ok) {
        e.target.elements["nombre"].value = "";
        e.target.elements["categoria"].value = "";
        e.target.elements["precio"].value = "";
        e.target.elements["imagen"].value = "";

        console.log(modal)
        modal.style.display = 'block';

        modal.innerHTML = `
          <div id='modal' class='flex-col-center-center'>
            <i class="fa fa-window-close" id='cerrar-modal' aria-hidden="true"></i>
            <h4>¡Producto modificado exitosamente!</h4>
            <i class="fa fa-check-circle" aria-hidden="true"></i>
          </div>
        `;

        const botonCerrarModal = document.getElementById("cerrar-modal");

        botonCerrarModal.addEventListener("click", () => {
          modal.style.display = 'none';
          // hago esto para que se renderice de nuevo la pagina y vuelva a mostrarme la busqueda por id
          window.location.reload();
        })

        window.addEventListener("click", (e) => {
          if (e.target === modal) {
            modal.style.display = 'none';
            // hago esto para que se renderice de nuevo la pagina y vuelva a mostrarme la busqueda por id
            window.location.reload();
          }
        })

        let result = await response.json();
        console.log(result.message);


      } else {
        modal.style.display = 'block';

        modal.innerHTML = `
          <div id='modal' class='flex-col-center-center'>
            <i class="fa fa-window-close" id='cerrar-modal' aria-hidden="true"></i>
            <h4>¡Ha surgido un error al modificar el producto!</h4>
            <i class="fa fa-exclamation-circle" aria-hidden="true"></i>
          </div>
        `;

        const botonCerrarModal = document.getElementById("cerrar-modal");

        botonCerrarModal.addEventListener("click", () => {
          modal.style.display = 'none';
        })

        window.addEventListener("click", (e) => {
          if (e.target === modal) {
            modal.style.display = 'none';
          }
        })
      }
    } catch (error) {
      console.error("Error al modificar el producto", error);
    }
  })
}

