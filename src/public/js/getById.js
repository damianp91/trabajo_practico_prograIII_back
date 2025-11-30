let getProduct_form = document.getElementById("getProduct-form");
let listaProductos = document.getElementById("lista-productos");
let url = "http://localhost:4000/api/products";


getProduct_form.addEventListener("submit", async (event) => {

  event.preventDefault();

  console.log("Formulario no enviado");
  console.log(event.target);

  // guardar como objetos los valores del formulario HTML
  let formData = new FormData(event.target);
  console.log(formData);

  // transformar este objeto FormData en un objeto normal JavaScript
  let data = Object.fromEntries(formData.entries());
  console.log(data);

  let idProd = data.id;
  console.log(idProd);

  console.log(`Extraido valor numerico del formulario en la variable id, que vale ${idProd}`)

  try {
    console.log(`Haciendo peticion GET a la url: ${url}/${idProd}`)
    let respuesta = await fetch(`http://localhost:3000/api/products/${idProd}`);
    console.log(respuesta);

    let datos = await respuesta.json();
    console.log(datos);

    if(respuesta.ok) {
      console.log(datos.payload);
      console.log(datos.payload[0]);

      let producto = datos.payload[0];

      mostrarProducto(producto);

    } else {
      console.error(datos.message);

      mostrarError(datos.message);
    }

  } catch (error) {
    console.log(error);
  }

});

function mostrarProducto(producto) {
  console.table(producto);

  let htmlProducto = `
    <li class="li-listados">
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <p>Id: ${producto.id} / Nombre: ${producto.nombre} / <strong>Precio: ${producto.precio}</strong></p>
    </li>
  `;

  listaProductos.innerHTML = htmlProducto;
}

// Imprimimos un mensaje visual de error
function mostrarError(error) {

  let htmlError = `
    <li class="mensaje-error">
      <p>
        <strong>Error:</strong>
        <span>${error}</span>
      </p>
    </li>
  `;

  listaProductos.innerHTML = htmlError;
}
