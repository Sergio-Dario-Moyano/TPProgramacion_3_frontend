// LÓGICA DEL LOCALSTORAGE

export let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
export let productos = [];

// LÓGICA DEL FETCH A LA API

export const obtenerProductos = async () => {
    const respuesta = await fetch('http://localhost:3000/api/productos'); 
    if (!respuesta.ok) throw new Error('Error al obtener los productos del servidor');
    
    // Guardamos directo en la variable global y la retornamos
    productos = await respuesta.json();
    return productos;
};

//LÓGICA PARA BUSCAR PRODUCTOS

export const buscarProductos = (palabraBuscada) => {
    const texto = palabraBuscada.toLowerCase();
    
    return productos.filter(producto => 
        producto.nombre.toLowerCase().includes(texto) || 
        producto.descripcion.toLowerCase().includes(texto)
    );
};

// LÓGICA DEL CARRITO 

export const agregarAlCarrito = (nombre, precio, imagen) => {
    const yaExisteEnElCarrito = carrito.find(item => item.nombre === nombre);

    if (yaExisteEnElCarrito) {
        yaExisteEnElCarrito.cantidad++;
    } else {
        carrito.push({ nombre, precio, imagen, cantidad: 1 });
    }
    guardarCarrito();
};

// MODIFICAMOS LA CANTIDAD DE UN PRODUCTO QUE YA ESTÁ EN EL CARRITO

export const modificarCantidad = (index, cantidad) => {
    carrito[index].cantidad += cantidad;
    if (carrito[index].cantidad <= 0) {
        carrito.splice(index, 1); 
    }
    guardarCarrito();
};

// ELIMINA UN PRODUCTO DEL CARRITO COMPLETAMENTE

export const eliminarDelCarrito = (index) => {
    carrito.splice(index, 1);
    guardarCarrito();
};

//SOBREESCRIBIMOS EL CARRITO, LO VACIAMOS Y GUARDAMOS

export const vaciarCarrito = () => {
    carrito = []; 
    guardarCarrito();
};

//GUARDAR CARRITO EN EL LOCALSTORAGE

export const guardarCarrito = () => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
};

// OBTENEMOS LA CANTIDAD DE ITEMS DE UN PRODUCTO

export const obtenerTotalItems = () => {
    return carrito.reduce((acumulador, prod) => acumulador + prod.cantidad, 0);
};

// OBTENEMOS EL TOTAL A PAGAR

export const obtenerTotalAPagar = () => {
    return carrito.reduce((acumulador, prod) => acumulador + (prod.precio * prod.cantidad), 0);
};
