fetch("https://api.bluelytics.com.ar/v2/latest")
    .then(response => response.json())
    .then(data => {
        console.log(data);

        let precioDolar = parseInt(data['blue']['value_avg']);
        let precioDolaroficial = parseInt(data['oficial']['value_avg']);
        let precioEuro = parseInt(data['blue_euro']['value_avg']);
        let precioEuroofical = parseInt(data['oficial_euro']['value_avg']);

        const monedas = [{

                nombre: "Bitcoin",
                valor: 20000,
                comparador: "usd",
                imagen: "./images/btc.png",
                id: "crypto",
                radio: "uno",
                input: "bitinput"

            },
            {
                nombre: "Dolar Blue",
                valor: precioDolar,
                comparador: "pesos",
                imagen: "./images/dollar.blue.png",
                id: "fisico",
                radio: "dos",
                input: "dolarinput"
            },
            {
                nombre: "Dolar Oficial",
                valor: precioDolaroficial,
                comparador: "pesos",
                imagen: "./images/dollar.jpg.png",
                id: "fisico",
                radio: "dosOficial",
                input: "dolarOficialinput"
            },
            {
                nombre: "Euro Blue",
                valor: precioEuro,
                comparador: "pesos",
                imagen: "./images/euro-blue.png",
                id: "fisico",
                radio: "tres",
                input: "eurinput"
            },
            {
                nombre: "Euro Ofical",
                valor: precioEuroofical,
                comparador: "pesos",
                imagen: "./images/euro.png",
                id: "fisico",
                radio: "tresOficial",
                input: "eurOficialinput"
            },
            {
                nombre: "Oro",
                valor: 13482,
                comparador: "usd",
                imagen: "./images/gold.png",
                id: "metales",
                radio: "cuatro",
                input: "oroinput"
            },
            {
                nombre: "Plata",
                valor: 2988,
                comparador: "usd",
                imagen: "./images/lingotePlata.png",
                id: "metales",
                radio: "cinco",
                input: "platainput"
            },
            {
                nombre: "Ethereum",
                valor: 189814,
                comparador: "usd",
                imagen: "./images/ethereum.png",
                id: "crypto",
                radio: "seis",
                input: "etinput"
            }

        ]
        // Creado el DOM
        const contenedorMonedas = document.querySelector("#contenedor-monedas");
        let botonesconvertir = document.querySelectorAll(".boton")

        const botonesCategorias = document.querySelectorAll(".boton-categoria");
        let botonesAgregar = document.querySelectorAll(".moneda-agregar");

        function cargarProductos(monedasElegidos) {

            contenedorMonedas.innerHTML = "";

            monedasElegidos.forEach(monedas => {

                const div = document.createElement("div");
                div.classList.add("moneda");
                div.innerHTML = `
            <div class="card-group w-50 mb-2">
            <div class="card">
                <img src="${monedas.imagen}" class="card-img-top w-75 alt="...">
                <div class="card-body">
                    <h5 class="card-title">${monedas.nombre}</h5>
                    <p class="card-text">Valor promedio </p>
                </div>
                <div class="card-footer">
                    <div class="form-floating">
                        
                        <p>$${monedas.valor} </p>
                        <button class="moneda-agregar btn" id="${monedas.nombre}">Favoritos</button>
                        <button class="btn boton" id="${monedas.radio}" >Convertir</button>
                    </div>
                    <div class="form-floating w-100">
    
                    <input type="number" class="form-control input w-100" id="${monedas.input}"
                        placeholder="Leave a comment here"></input>
                    <label for="floatingTextarea2">$arg</label>
                    
                    
                </div>
                </div>
            </div>
        </div>
     `;

                contenedorMonedas.append(div);

            })

            actulizarbotonesconvertir()
            actualizarBotonesAgregar();

        };



        cargarProductos(monedas);
        botonesCategorias.forEach(boton => {
            boton.addEventListener("click", (e) => {

                botonesCategorias.forEach(boton => boton.classList.remove("active"));
                e.currentTarget.classList.add("active");

                if (e.currentTarget.id != "todos") {
                    const monedasBoton = monedas.filter(moneda => moneda.id === e.currentTarget.id);

                    cargarProductos(monedasBoton);

                } else {

                    cargarProductos(monedas);
                }

            })
        });


        function actulizarbotonesconvertir() {
            botonesconvertir = document.querySelectorAll(".boton");
            botonesconvertir.forEach(boton => {
                boton.addEventListener("click", convertir);
            })
        }
        // Creando funcionalidar a los Botones

        // Boton Favoritos

        let monedas_Favoritas = [];


        let monedasfavoritasLS = localStorage.getItem("monedasFavoritas");

        if (monedasfavoritasLS) {
            monedas_Favoritas = JSON.parse(monedasfavoritasLS);

        } else {
            monedas_Favoritas = [];
        }


        function actualizarBotonesAgregar() {
            botonesAgregar = document.querySelectorAll(".moneda-agregar");

            botonesAgregar.forEach(boton => {
                boton.addEventListener("click", agregarAfavoritos);
            });
        }

        function agregarAfavoritos(e) {
            const idBoton = e.currentTarget.id;
            const productoAgregado = monedas.find(moneda => moneda.nombre === idBoton);

            Toastify({

                text: "Agregado a Favoritos :)",

                duration: 3000,
                position: "left"

            }).showToast();

            if (monedas_Favoritas.some(producto => producto.nombre === idBoton)) {


            } else {
                monedas_Favoritas.push(productoAgregado);


            }



            localStorage.setItem("monedasFavoritas", JSON.stringify(monedas_Favoritas));
        }
        // 
        // Boton del Conversor
        function convertir(e) {
            const botonconvertir = e.currentTarget.id;

            if (botonconvertir == "uno") {
                convertirBitcoin()
            } else if (botonconvertir == "dos") {
                convertirDolar()
            } else if (botonconvertir == "dosOficial") {
                convertirDolarOficial()()
            } else if (botonconvertir == "tres") {
                convertirEuro()
            } else if (botonconvertir == "tresOficial") {
                convertirEuroOficial()
            } else if (botonconvertir == "cuatro") {
                convertirOro()
            } else if (botonconvertir == "cinco") {
                convertirPlata()
            } else if (botonconvertir == "seis") {
                convertirEthereum()
            } else {
                console.log(botonconvertir);

            }
        }

        function convertirBitcoin() {
            let uno = document.querySelector("#uno");
            let resultado = 0
            let valore = parseInt(document.getElementById("bitinput").value);
            resultado = valore / 20000;
            if (isNaN(resultado)) {
                Swal.fire("Por Favor ponga un numero")

            } else
                Swal.fire("bts " + resultado);
        }

        function convertirDolar() {
            const dos = document.querySelector("#dos")
            let resultado = 0
            let valore = parseInt(document.getElementById("dolarinput").value);
            resultado = valore / precioDolar;
            if (isNaN(resultado)) {
                Swal.fire("Por Favor ponga un numero")

            } else
                Swal.fire("usd " + resultado);
        }

        function convertirDolarOficial() {
            const dosOfical = document.querySelector("#dosOficial")
            let resultado = 0
            let valore = parseInt(document.getElementById("dolarOficialinput").value);
            resultado = valore / precioDolaroficial;
            if (isNaN(resultado)) {
                Swal.fire("Por Favor ponga un numero")

            } else
                Swal.fire("usd " + resultado);
        }

        function convertirEuro() {
            const tres = document.querySelector("#tres")
            let resultado = 0
            let valore = parseInt(document.getElementById("eurinput").value);
            resultado = valore / precioEuro;
            if (isNaN(resultado)) {
                Swal.fire("Por Favor ponga un numero")

            } else
                Swal.fire("eur " + resultado);
        }

        function convertirEuroOficial() {
            const tres = document.querySelector("#dosOficial")
            let resultado = 0
            let valore = parseInt(document.getElementById("eurOficialinput").value);
            resultado = valore / precioEuroofical;
            if (isNaN(resultado)) {
                Swal.fire("Por Favor ponga un numero")

            } else
                Swal.fire("eur " + resultado);
        }

        function convertirOro() {
            const cuatro = document.querySelector("#cuatro");
            let resultado = 0
            let valore = parseInt(document.getElementById("oroinput").value);
            resultado = valore / monedas[5]['valor'];
            if (isNaN(resultado)) {
                Swal.fire("Por Favor ponga un numero")

            } else
                Swal.fire("Oro " + resultado);
        }

        function convertirPlata() {
            const cinco = document.querySelector("#cinco");
            let resultado = 0
            let valore = parseInt(document.getElementById("platainput").value);
            resultado = valore / monedas[6]['valor'];
            if (isNaN(resultado)) {
                Swal.fire("Por Favor ponga un numero")

            } else
                Swal.fire("Plata " + resultado);
        }


        function convertirEthereum() {

            const seis = document.querySelector("#seis");
            let resultado = 0
            let valore = parseInt(document.getElementById("etinput").value);
            resultado = valore / 20000;
            if (isNaN(resultado)) {
                Swal.fire("Por Favor ponga un numero")

            } else
                Swal.fire("ETH " + resultado);
        }
    })