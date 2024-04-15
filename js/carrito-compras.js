function Producto(id, nombre, precio, imagen, descripcion, calificacion, marca, color, material, stock){
    const ProductoObject = {
        id: id,
        nombre1: nombre,
        precio1: precio,
        imagen1: imagen,
        descripcion1: descripcion,
        calificacion1: calificacion,
        caracteristicas1: {
            marca1: marca,
            color1: color,
            material1: material
        }
    }
    return ProductoObject;
}
function crearProductos(){
    const productosDisponibles = [];
    const producto1 = new Producto(1, "Refrigerador S", 1000, "../img/p1.jpeg", "Es un refrigerador pequeño de color Plomo que cuenta con congelador.", 5, "LG", "Plomo", "Aluminio");
    const producto2 = new Producto(2, "Lavadora M", 1300, "../img/p2.jpeg", "Es una lavadora con capacidad de 6 Kg. que tiene incluido centrifugado de la ropa", 4, "MASTER-G", "Blanco", "Aluminio");
    const producto3 = new Producto(3, "Microondas", 800, "../img/p3.jpeg", "Es un microondas con potencia de 90 Watts con bloqueo automatico.", 4, "LG", "Negro", "Aluminio");
    const producto4 = new Producto(4, "Cocina", 8000, "../img/p4.jpeg", "Es una cocina con horno incluido de 5 hornillas.", 5, "BOSCH", "Plomo", "Aluminio");
    const producto5 = new Producto(5, "Lavadora L", 3000, "../img/p5.jpeg", "Es un Lavadora para 13 Kg. de ropa, que inclute lavado inteligente segun el peso", 4, "WHIRLPOOL", "Negro", "Plastico PVC");
    const producto6 = new Producto(6, "Tostadora", 500, "../img/p6.jpeg", "Es una tostadora con capacidad para dos panes molde", 5, "OSTER", "Plomo", "Plastico PVC");
    const producto7 = new Producto(7, "Refrigerador L", 10000, "../img/p7.jpeg", "Es un refrigerador con dispensador de agua y con dos recmaras separadas para congelador y refirgerador", 5, "LG", "Blanco", "Aluminio");
    const producto8 = new Producto(8, "Televisor", 5000, "../img/p8.jpeg", "Es un televisor de 50 plg. con calidad UHD que tiene incluido en S.O. WebOS", 5, "SAMSUNG", "Negro", "Plastico PVC");
    const producto9 = new Producto(9, "Aspiradora", 700, "../img/p9.jpeg", "Es una aspiradora capaz de realizar lavado/secado a vapor de sus muebles ", 5, "KHARCHER", "Amarillo", "Plastico PVC");
    productosDisponibles.push(producto1);
    productosDisponibles.push(producto2);
    productosDisponibles.push(producto3);
    productosDisponibles.push(producto4);
    productosDisponibles.push(producto5);
    productosDisponibles.push(producto6);
    productosDisponibles.push(producto7);
    productosDisponibles.push(producto8);
    productosDisponibles.push(producto9);
    return productosDisponibles;
}

function inicializarProcesos(){
    productos.forEach((prod)=>{
        const { id, imagen1, nombre1, descripcion1, precio1, caracteristicas1 } = prod;
        const fila = document.createElement("div");
        fila.classList.add("col-lg-6");
        fila.classList.add("wow");
        fila.classList.add("fadeInUp");
        fila.innerHTML = `
            <div class="team-item" data-id="${id}">
                <div class="team-img">
                    <img src="${imagen1}" alt="Image">
                </div>
                <div class="team-text">
                    <p id="nombre"><b>${nombre1}</b></p>
                    <p id="descripcion">${descripcion1}</p>
                    <p id="marca"><b>Marca: </b>${caracteristicas1.marca1} </p>
                    <p id="color"><b>Color: </b>${caracteristicas1.color1} </p>
                    <p id="precio"><b>Precio: </b>Bs. ${precio1} </p>
                    <b><a class="btn btn-success agregar-carrito" href="#" data-id=${id} id="agregar-carrito">Agregar carrito</a></b>
                </div>
            </div>
        `;
        productosDisponibles.appendChild(fila);
    });
}

function anadirProducto(e){
    e.preventDefault();
    if (e.target.classList.contains("agregar-carrito")) {
        const productoSeleccionado = e.target.parentElement.parentElement.parentElement;
        leerDatosProducto(productoSeleccionado);
    }
}

function leerDatosProducto(productoSeleccionado) {
    const prod = {
        imagen: productoSeleccionado.querySelector("img").src,
        nombre: productoSeleccionado.querySelector("#nombre").innerText,
        precio: productoSeleccionado.querySelector("#precio").innerText,
        id: productoSeleccionado.querySelector("#agregar-carrito").getAttribute("data-id"),
        cantidad: 1
    }
    prod.precio = prod.precio.replace("Precio: Bs.", "");

    if(arrayCarrito.some((product) => product.id === prod.id)){
        const producto = arrayCarrito.map((product) => {
            if (product.id === prod.id) {
                product.cantidad++;
                return product;
            } else {
                return product;
            }
        });
        arrayCarrito = [...producto];
    } else {
        arrayCarrito = [...arrayCarrito, prod];
    }
    total = parseFloat(total) + parseFloat(prod.precio);
    llenarListaCarrito();
}

function llenarListaCarrito(){
    limpiarListaCarrito();
    let totalParcial = 0;
    arrayCarrito.forEach((producto)=>{
        const { id, imagen, nombre, precio, cantidad } = producto;
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td><img src="${imagen}" width="100"></td>
            <td>${nombre}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td> <a href="#" class="btn btn-danger borrar-producto" id="borrar-producto" data-id="${id}">Borrar</a></td>
        `;
        contenedorCarrito.appendChild(fila);
    });
    carritoTotal.innerText = total;
    sincronizarStorage();
}

function limpiarListaCarrito(){
    contenedorCarrito.innerHTML = "";
    carritoTotal.innerText = 0;
}


function vaciarCarritoF(){
    arrayCarrito = [];
    total = 0;
    llenarListaCarrito();
}

function borrarProductoF(e){
    if (e.target.classList.contains("borrar-producto")) {
        let totalParcial = 0;
        const prodId = e.target.getAttribute("data-id");
        arrayCarrito = arrayCarrito.filter((producto) => producto.id !== prodId);
        arrayCarrito.forEach((prod)=>{
            totalParcial = parseFloat(totalParcial) + parseFloat(prod.precio);
        });
        total = totalParcial;
        llenarListaCarrito();

    }
}

function sincronizarStorage(){
    localStorage.setItem("carrito", JSON.stringify(arrayCarrito));
    localStorage.setItem("total", total);
}

const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarrito = document.querySelector("#vaciar-carrito");

const productosDisponibles = document.querySelector("#productos-disponibles");
const anadirProductos = document.querySelectorAll("#agregar-carrito");
const borrarProducto = document.querySelector("#borrar-producto");


const carritoTotal = document.querySelector("#carrito-total");

let arrayCarrito = [];
let productos = crearProductos();
let total = 0;
document.addEventListener("DOMContentLoaded", inicializarProcesos);
productosDisponibles.addEventListener("click", anadirProducto);
vaciarCarrito.addEventListener("click", vaciarCarritoF);
contenedorCarrito.addEventListener("click", borrarProductoF);
document.addEventListener("DOMContentLoaded", ()=>{
    arrayCarrito = JSON.parse(localStorage.getItem("carrito")) || [];
    total = localStorage.getItem("total") || 0;
    llenarListaCarrito();
});