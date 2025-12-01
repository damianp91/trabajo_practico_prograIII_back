const formularioCrearProducto = document.getElementById("formulario-crear-productos");

formularioCrearProducto.addEventListener("submit", async function (e) {
  e.preventDefault();
  let formData = new FormData(e.target);
  console.log(formData);
  let data = Object.fromEntries(formData.entries());
  console.log(data);
  try {
    let response = await fetch("http://localhost:3000/api/products", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (response.ok){
      e.target.elements["nombre"].value = "";
      e.target.elements["categoria"].value = "";
      e.target.elements["precio"].value = "";
      e.target.elements["imagen"].value = "";

      const modal = document.getElementById("modal-container");
      modal.style.display = 'block';

      modal.innerHTML = `
        <div id='modal' class='flex-col-center-center'>
          <i class="fa fa-window-close" id='cerrar-modal' aria-hidden="true"></i>
          <h4>¡Producto creado exitosamente!</h4>
        <i class="fa fa-check-circle" aria-hidden="true"></i>
        </div>
      `;

      const botonCerrarModal = document.getElementById("cerrar-modal");

      botonCerrarModal.addEventListener("click", () =>{
        modal.style.display = 'none';
      })

      window.addEventListener("click", (e) =>{
        if(e.target === modal){
          modal.style.display = 'none';
        }
      })

      let result = await response.json();
      console.log(result.message);
    }else{
      const modal = document.getElementById("modal-container");
      modal.style.display = 'block';

      modal.innerHTML = `
        <div id='modal' class='flex-col-center-center'>
          <i class="fa fa-window-close" id='cerrar-modal' aria-hidden="true"></i>
          <h4>¡Ha surgido un error al crear el producto!</h4>
          <i class="fa fa-exclamation-circle" aria-hidden="true"></i>
        </div>
      `;

      const botonCerrarModal = document.getElementById("cerrar-modal");

      botonCerrarModal.addEventListener("click", () =>{
        modal.style.display = 'none';
      })

      window.addEventListener("click", (e) =>{
        if(e.target === modal){
          modal.style.display = 'none';
        }
      })
    }
  } catch (error) {
    console.error("Error en la conexión:", error);
    
    // Muestra un modal de error genérico si hay un fallo de red
    const modal = document.getElementById("modal-container");
    modal.style.display = 'block';
    modal.innerHTML = `... mensaje de "Error de conexión con el servidor" ...`;
  }
})
