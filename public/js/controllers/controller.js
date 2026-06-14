// Importaciones
import * as Model from '../models/model.js';
import * as View from '../views/view.js';

//CAPTURA DE LOS DATOS DEL FORMULARIO DE BIENVENIDA
const formularioRegistro = () => {
    const formRegistro =  document.getElementById("registro-form");

    if(formRegistro) {
        formRegistro.addEventListener("submit", async (event) => {
            event.preventDefault();;
            
            const nombreUsuario = document.getElementById("nombre-usuario").value;
            const emailUsuario = document.getElementById("email-usuario").value;

            localStorage.setItem("usuario", nombreUsuario);
            localStorage.setItem("email", emailUsuario);

            try {
                const response = await fetch("/api/usuarios", {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({ nombreUsuario, emailUsuario })
                })

                if(response.ok) {
                    window.location.href = "/tienda";
                }else {
                    console.log("Error al registrar usuario");
                    alert("No se pudo completar el registro")
                    
                }
            } catch (error) {
                console.log("Error de red: ", error);
                
            }
        })
    }
}

// RECUPERAR DEL LOCALSTORAGE NOMBRE Y EMAIL DEL USUARIO
const recuperarDatosDelUsuario = () => {
    const datosCliente = document.getElementById("datos-cliente");
    const bienvenidaCliente = document.getElementById("bienvenida-cliente");

    const nombreUsuario = localStorage.getItem("usuario");
    const emailUsuario = localStorage.getItem("email");

    if(bienvenidaCliente) {
        bienvenidaCliente.innerHTML = `<span><h2>Bienvenido ${nombreUsuario} a nuestra tienda!</h2></span>`
    }

    if(datosCliente) {
        datosCliente.innerHTML = `¡¡¡<span class="nombre-usuario-color"> ${nombreUsuario} </span> gracias por elegirnos!!!
        Enviaremos tu ticket a <span class="email-usuario-color"> ${emailUsuario} </span>`;
    }
}

// --- FUNCION AUXILIAR ---

export const actualizarCarrito = () => {
    View.actualizarContadorHeader(Model.obtenerTotalItems());
    View.renderizarCarritoLateral(Model.carrito, Model.obtenerTotalAPagar());
    controlLateral();
};

// --- EVENTO DE LOS BOTONOES DE LAS CARDS

export const botonesProductos = () => {
    const botones = document.querySelectorAll('.card .btn-comprar');
    botones.forEach(boton => {
        boton.addEventListener('click', (e) => {
            const dataset = e.target.dataset;
            // Le dice al Modelo qué guardar
            Model.agregarAlCarrito(dataset.nombre, parseFloat(dataset.precio), dataset.imagen);
            
            // Le pide a la Vista qué dibujar
            actualizarCarrito(); 
            View.animarBotonYCarrito(boton);
        });
    });
};

export const controlLateral = () => {
    document.querySelectorAll('.btn-sumar').forEach(btn => {
        btn.addEventListener('click', (e) => {
            Model.modificarCantidad(e.target.dataset.index, 1);
            actualizarCarrito();
        });
    });

    document.querySelectorAll('.btn-restar').forEach(btn => {
        btn.addEventListener('click', (e) => {
            Model.modificarCantidad(e.target.dataset.index, -1);
            actualizarCarrito();
        });
    });

    document.querySelectorAll('.btn-eliminar').forEach(btn => {
        btn.addEventListener('click', (e) => {
            Model.eliminarDelCarrito(e.target.dataset.index); 
            actualizarCarrito();
        });
    });
};

// --- EVENTOS DE LOS BOTONES DEL HEADER

export const botonesCarrito = () => {
    // Abrir / Cerrar panel
    document.querySelector('.cart-icon')?.addEventListener('click', (e) => {
        e.preventDefault();
        View.toggleMenuLateral(true);
    });
    
    document.getElementById('close-cart')?.addEventListener('click', () => View.toggleMenuLateral(false));
    document.getElementById('cart-overlay')?.addEventListener('click', () => View.toggleMenuLateral(false));

    // Checkout
    document.getElementById('btn-finalizar-compra')?.addEventListener('click', () => {
        if (Model.carrito.length === 0) return alert("Tu carrito está vacío.");
        
        View.renderizarTicket(Model.carrito, Model.obtenerTotalAPagar());
        View.toggleMenuLateral(false);
        View.toggleTicket(true);
    });

    // Cerrar Ticket, vaciar carrito, ocultar modal y volver al inicio
    document.getElementById('btn-cerrar-ticket')?.addEventListener('click', () => {
        Model.vaciarCarrito();
        actualizarCarrito();
        View.toggleTicket(false);
        window.location.href = "/";
    });
};

export const menuHamburguesa = () => {
    const menuBtn = document.getElementById('menu-btn');
    const navLinks = document.getElementById('nav-links');

    const svgHamburguesa = `
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
        </svg>`;
        
    const svgCruz = `
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16">
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
        </svg>`;
    
    menuBtn?.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuBtn.innerHTML = navLinks.classList.contains('active') ? svgCruz : svgHamburguesa;
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    navLinks?.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            if(menuBtn) menuBtn.innerHTML = svgHamburguesa;
            document.body.style.overflow = '';
        });
    });
};

export const buscador = () => {
    const searchBar = document.querySelector('.search-bar');
    
    if (searchBar) {
        searchBar.addEventListener('input', (e) => {
            const palabraABuscar = e.target.value;
            const productosFiltrados = Model.buscarProductos(palabraABuscar);
            
            View.renderizarProductos(productosFiltrados);
            botonesProductos();
        });
    }
};

// --- INICIALIZACIÓN ---

export const init = async () => {
    try {
        formularioRegistro();
        recuperarDatosDelUsuario();

        const productos = await Model.obtenerProductos();
        View.renderizarProductos(productos);
        actualizarCarrito();
        
        // Eventos Header
        menuHamburguesa();
        botonesCarrito();
        buscador();
        
        // Eventos Dinámicos (Tarjetas y Carrito Lateral)
        botonesProductos();
    } catch (error) {
        console.error("Hubo un problema al iniciar la app:", error);
    }
};
