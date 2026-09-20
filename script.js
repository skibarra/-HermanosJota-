const productos = [
    {
        nombre: "Mueble de madera artesanal",
        precio: 250000,
        descripcion: "Pieza elaborada artesanalmente con materiales seleccionados."
    },
    {
        nombre: "Mueble de diseño atemporal",
        precio: 320000,
        descripcion: "Diseño pensado para combinar tradición y funcionalidad."
    },
    {
        nombre: "Mueble sustentable",
        precio: 280000,
        descripcion: "Fabricado utilizando materiales seleccionados y sustentables."
    }
];

console.log(productos);


// ==============================
// CATÁLOGO DE PRODUCTOS
// ==============================

const listaProductos = document.getElementById("listaProductos");

async function cargarProductos() {

    await new Promise(function(resolve) {
        setTimeout(resolve, 1000);
    });

    productos.forEach(function(producto) {

        const article = document.createElement("article");

        article.innerHTML = `
            <h3>${producto.nombre}</h3>
            <p>${producto.descripcion}</p>
            <p>Precio: $${producto.precio}</p>
            <a href="producto.html?id=${productos.indexOf(producto)}">Ver producto</a>
        `;

        listaProductos.appendChild(article);
    });
}

if (listaProductos) {
    cargarProductos();
}


// ==============================
// DETALLE DEL PRODUCTO
// ==============================

const detalleProducto = document.getElementById("detalleProducto");

if (detalleProducto) {

    const parametros = new URLSearchParams(window.location.search);
    const id = Number(parametros.get("id"));

    const producto = productos[id];

    detalleProducto.innerHTML = `
        <h3>${producto.nombre}</h3>
        <p>${producto.descripcion}</p>
        <p>Precio: $${producto.precio}</p>
    `;
}


// ==============================
// CARRITO
// ==============================

let contadorCarrito = Number(localStorage.getItem("carrito")) || 0;

const btnCarrito = document.getElementById("btnCarrito");
const contador = document.getElementById("contadorCarrito");

if (contador) {
    contador.textContent = contadorCarrito;
}

if (btnCarrito) {

    btnCarrito.addEventListener("click", function() {

        const parametros = new URLSearchParams(window.location.search);
        const id = Number(parametros.get("id"));

        let carrito = JSON.parse(localStorage.getItem("productosCarrito")) || [];

        carrito.push(id);

        localStorage.setItem(
            "productosCarrito",
            JSON.stringify(carrito)
        );

        contadorCarrito = carrito.length;

        localStorage.setItem("carrito", contadorCarrito);

        contador.textContent = contadorCarrito;
    });
}


// ==============================
// FORMULARIO DE CONTACTO
// ==============================

const formContacto = document.getElementById("formContacto");
const mensajeExito = document.getElementById("mensajeExito");

if (formContacto) {

    formContacto.addEventListener("submit", function(event) {

        event.preventDefault();

        const nombre = document.getElementById("nombre").value;
        const email = document.getElementById("email").value;
        const mensaje = document.getElementById("mensaje").value;

        if (nombre === "") {
            mensajeExito.textContent = "Por favor, ingresá tu nombre.";
            return;
        }

        if (email === "") {
            mensajeExito.textContent = "Por favor, ingresá tu email.";
            return;
        }

        if (mensaje === "") {
            mensajeExito.textContent = "Por favor, escribí un mensaje.";
            return;
        }

        if (!email.includes("@") || !email.includes(".")) {
            mensajeExito.textContent = "Ingresá un email válido.";
            return;
        }

        mensajeExito.textContent = "Mensaje enviado correctamente.";

        formContacto.reset();
    });
}


// ==============================
// BUSCADOR
// ==============================

const buscador = document.getElementById("buscador");

if (buscador) {

    buscador.addEventListener("input", function() {

        const texto = buscador.value.toLowerCase();

        const productosFiltrados = productos.filter(function(producto) {

            return producto.nombre
                .toLowerCase()
                .includes(texto);
        });

        listaProductos.innerHTML = "";

        productosFiltrados.forEach(function(producto) {

            const article = document.createElement("article");

            article.innerHTML = `
                <h3>${producto.nombre}</h3>
                <p>${producto.descripcion}</p>
                <p>Precio: $${producto.precio}</p>
                <a href="producto.html?id=${productos.indexOf(producto)}">
                    Ver producto
                </a>
            `;

            listaProductos.appendChild(article);
        });
    });
}


// ==============================
// MOSTRAR CARRITO
// ==============================

const listaCarrito = document.getElementById("listaCarrito");
const totalCarrito = document.getElementById("totalCarrito");

if (listaCarrito) {

    const carrito =
        JSON.parse(localStorage.getItem("productosCarrito")) || [];

    let total = 0;

    if (carrito.length === 0) {

        listaCarrito.innerHTML =
            "<p>Tu carrito está vacío.</p>";
    }

    carrito.forEach(function(id) {

        const producto = productos[id];

        const article = document.createElement("article");

        article.innerHTML = `
            <h3>${producto.nombre}</h3>
            <p>Precio: $${producto.precio}</p>
            <button class="eliminarProducto">Eliminar</button>
        `;

        listaCarrito.appendChild(article);

        const botonEliminar =
            article.querySelector(".eliminarProducto");

        botonEliminar.addEventListener("click", function() {

            carrito.splice(carrito.indexOf(id), 1);

            localStorage.setItem(
                "productosCarrito",
                JSON.stringify(carrito)
            );

            location.reload();
        });

        total += producto.precio;
    });

    totalCarrito.textContent = total;
}


// ==============================
// VACIAR CARRITO
// ==============================

const vaciarCarrito =
    document.getElementById("vaciarCarrito");

if (vaciarCarrito) {

    vaciarCarrito.addEventListener("click", function() {

        localStorage.removeItem("productosCarrito");
        localStorage.removeItem("carrito");

        listaCarrito.innerHTML =
            "<p>Tu carrito está vacío.</p>";

        totalCarrito.textContent = "0";

        if (contador) {
            contador.textContent = "0";
        }
    });
}


// ==============================
// FINALIZAR COMPRA
// ==============================

const finalizarCompra =
    document.getElementById("finalizarCompra");

const mensajeCompra =
    document.getElementById("mensajeCompra");

if (finalizarCompra) {

    finalizarCompra.addEventListener("click", function() {

        const carrito =
            JSON.parse(localStorage.getItem("productosCarrito")) || [];

        if (carrito.length === 0) {

            mensajeCompra.textContent =
                "No hay productos en el carrito.";

            return;
        }

        mensajeCompra.textContent =
            "Compra realizada correctamente.";

        localStorage.removeItem("productosCarrito");
        localStorage.removeItem("carrito");

        listaCarrito.innerHTML =
            "<p>Tu carrito está vacío.</p>";

        totalCarrito.textContent = "0";

        contador.textContent = "0";
    });
}