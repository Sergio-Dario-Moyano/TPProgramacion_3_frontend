//LOGICA DEL FORMULARIO
export const guardarEnLocalStorage = (nombre, email) => {
    localStorage.setItem("usuario", nombre);
    localStorage.setItem("email", email);
}

export const obtenerDatosDelLocalStorage = () => {
    return {
        nombre: localStorage.getItem("usuario"),
        email: localStorage.getItem("email"),
    }
}

export const guardarEnDB = async (nombre, email) => {
    const response = await fetch("/api/usuarios", {
        method: "POST",
        headers: {"Content-type":"application/json"},
        body: JSON.stringify({nombreUsuario:nombre, emailUsuario:email})
    })
    return response.ok;
} 


// LÓGICA DEL LOCALSTORAGE
export let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
export let productos = [];

// LÓGICA DEL FETCH A LA API
export const obtenerProductos = async () => {
    const respuesta = await fetch('/api/productos');  
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

export const filtrarPorCategoria = (categoria) => {
    if (!categoria) return productos;
    
    return productos.filter(producto => 
        producto.categoria && producto.categoria.toLowerCase() === categoria.toLowerCase()
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

// PROCESAR VENTAS EN LA BD
export const registrarVentaActual = async() => {
    const fechaDB = new Date().toISOString().slice(0,19).replace('T', ' ');
    const datosVenta = {
        usuario: localStorage.getItem("usuario"),
        fecha: fechaDB,
        total: obtenerTotalAPagar(),
    };
    return await procesarVentaBD(datosVenta);
}

export const obtenerDatosDelComprobante = () => {
    return {
        cliente: localStorage.getItem("usuario"),
        fecha: new Date().toLocaleString('es-AR'),
        total: obtenerTotalAPagar(),
    };
}

export const procesarVentaBD = async (datosVenta) => {
    try {
        const respuesta = await fetch('/api/ventas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datosVenta)
        });

        if (!respuesta.ok) throw new Error('Error al registrar la compra en la base de datos');
        
        return await respuesta.json();
    } catch (error) {
        console.error("Problema de red al guardar:", error);
    }
};