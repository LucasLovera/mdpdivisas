let monedas_Favoritas = localStorage.getItem("monedasFavoritas");
const contenedorMonedas = document.querySelector("#contenedor-monedas");
let botonesEliminar = document.querySelectorAll(".moneda-eliminar");
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const contenedorMonedaVacia = document.querySelector("#moneda-vacia");



monedas_Favoritas = JSON.parse(monedas_Favoritas);

function cargarFavoritos() {
    if (monedas_Favoritas && monedas_Favoritas.length > 0) {
        contenedorMonedaVacia.classList.add("disabled")

        contenedorMonedas.innerHTML = "";
        monedas_Favoritas.forEach(moneda => {

            const div = document.createElement("div");
            div.classList.add("moneda");
            div.innerHTML = `
            <div class="card-group w-50">
            <div class="card">
                <img src=".${moneda.imagen}" class="card-img-top w-50 " alt="...">
                <div class="card-body">
                    <h5 class="card-title">${moneda.nombre}</h5>
                    <p class="card-text">Valor promedio </p>
                </div>
                <div class="card-footer">
                    <div class="form-floating">
                        
                        <p>$${moneda.valor} </p>
                    </div>
                    <button class="moneda-eliminar" id="${moneda.nombre}">Eliminar<i class="bi bi-trash-fill"></i></button>
                </div>
            </div>
        </div>
     `;

            contenedorMonedas.append(div);
        })
    } else {

        contenedorMonedaVacia.classList.remove("disabled")
        contenedorMonedas.classList.add("disabled")

    }
    actualizarBotonesEliminar()
}
cargarFavoritos()


function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(".moneda-eliminar");

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarFavorito);
    });
}

function eliminarFavorito(e) {
    const idBoton = e.currentTarget.id;
    const index = monedas_Favoritas.findIndex(moneda => moneda.nombre === idBoton);

    monedas_Favoritas.splice(index, 1);
    cargarFavoritos();

    localStorage.setItem("monedasFavoritas", JSON.stringify(monedas_Favoritas));

}