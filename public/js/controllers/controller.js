// Importaciones
import * as Model from '../models/model.js';
import * as View from '../views/view.js';

//CAPTURA DE LOS DATOS DEL FORMULARIO DE BIENVENIDA
export const inicializarRegistro = () => {
    const formRegistro =  document.getElementById("registro-form");

    if(formRegistro) {
        formRegistro.addEventListener("submit", async (event) => {
            event.preventDefault();

            //pedimos los datos a la vista
            const { nombre, email } = View.obtenerDatosDelFormulario();
            
            //pido al modelo que guarde la info y la envie a localStorage
            Model.guardarEnLocalStorage(nombre, email);

            try {
                const registroExitoso = await Model.guardarEnDB(nombre, email);

                if(registroExitoso) {
                    View.redirigirATienda();
                }else {
                    View.mostrarError("No se pudo completar el registro");
                }
            } catch (error) {
                View.mostrarError("Error de red al intentar registrar usuario")
            }
        })
    }
}

//RECUPERAR LOS DATOS DEL LOCALSTORAGE
export const cargarPerfilUsuario = () => {
    //pedimos los datos al modelo
    const { nombre, email } = Model.obtenerDatosDelLocalStorage();

    //los paso a la vista para el saludo inicial
    if(nombre && email) {
        View.renderizarBienvenida(nombre, email);
    }
}

// ACTUALIZAR CARRITO
export const actualizarCarrito = () => {
    View.actualizarContadorHeader(Model.obtenerTotalItems());
    View.renderizarCarritoLateral(Model.carrito, Model.obtenerTotalAPagar());
};

// EVENTO DE LOS BOTONES EN LAS CARDS
export const botonesProductos = () => {
    
    const contenedorGrid = document.querySelector('.grid-container');
    
    if (!contenedorGrid) return;

    contenedorGrid.addEventListener('click', (e) => {
        
        const boton = e.target.closest('.btn-comprar');

        if (!boton) return;

        const dataset = boton.dataset;
        
        Model.agregarAlCarrito(dataset.nombre, parseFloat(dataset.precio), dataset.imagen);
        
        actualizarCarrito(); 
        View.animarBotonYCarrito(boton);
    });
};

// EVENTOS EN LA VISUALIZACION DEL CARRITO LATERAL
export const controlLateral = () => {
    
    const contenedorCarrito = document.getElementById('cart-items-container');
    if (!contenedorCarrito) return;

    contenedorCarrito.addEventListener('click', (e) => {
        
        const btnSumar = e.target.closest('.btn-sumar');
        const btnRestar = e.target.closest('.btn-restar');
        const btnEliminar = e.target.closest('.btn-eliminar');

        if (btnSumar) {
            Model.modificarCantidad(btnSumar.dataset.index, 1);
            actualizarCarrito();
        } 
        else if (btnRestar) {
            Model.modificarCantidad(btnRestar.dataset.index, -1);
            actualizarCarrito();
        } 
        else if (btnEliminar) {
            Model.eliminarDelCarrito(btnEliminar.dataset.index);
            actualizarCarrito();
        }
    });
};

// EVENTOS DE LOS BOTONES DEL HEADER
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

    document.getElementById('btn-cerrar-ticket')?.addEventListener('click', async (e) => {
        const boton = e.target;

        View.setBotonProcesando(boton);

        try {
            await Model.registrarVentaActual();

            const datosDelComprobante = Model.obtenerDatosDelComprobante();

            // crear TXT, vaciar carrito, actualizarlo, cerrar ticket y redireccionar
            View.descargarTicketTXT(datosDelComprobante);
            Model.vaciarCarrito();
            actualizarCarrito();
            View.toggleTicket(false);
            window.location.href = "/";
        } catch (error) {
            console.log("Error en el flujo de venta", error);
            alert("No se pudo procesar la compra");
            View.restaurarBotonCerrar(boton);
            
        }
    });
};

// FUNCIONALIDAD DEL MENU EN MODO RESPONSIVE
export const menuHamburguesa = () => {
    const menuBtn = document.getElementById('menu-btn');
    const navLinks = document.getElementById('nav-links');

    if (!menuBtn || !navLinks) return;

    const svgHamburguesa = `
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
        </svg>`;
        
    const svgCruz = `
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16">
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
        </svg>`;

    
    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const isActive = navLinks.classList.contains('active');
        
        menuBtn.innerHTML = isActive ? svgCruz : svgHamburguesa;
        document.body.style.overflow = isActive ? 'hidden' : '';
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuBtn.innerHTML = svgHamburguesa;
            document.body.style.overflow = '';
        });
    });
};

// FUNCIONALIDAD DEL BUSCADOR
export const buscador = () => {
    const searchBar = document.querySelector('.search-bar');
    
    if (searchBar) {
        searchBar.addEventListener('input', (e) => {
            const palabraABuscar = e.target.value;
            const productosFiltrados = Model.buscarProductos(palabraABuscar);
            
            View.renderizarProductos(productosFiltrados);
        });
    }
};

// FILTROS DE CATEGORÍA DEL NAV
export const filtrosCategoria = () => {
    const linksFiltros = document.querySelectorAll('.nav-filter');

    linksFiltros.forEach(links => {
        links.addEventListener('click', (e) => {
            e.preventDefault(); 

            linksFiltros.forEach(link => link.classList.remove('active'));
            e.target.classList.add('active');

            const categoriaABuscar = e.target.dataset.categoria; 

            const productosFiltrados = Model.filtrarPorCategoria(categoriaABuscar);

            // Renderizamos los resultados
            View.renderizarProductos(productosFiltrados);
        });
    });
};

// INICIALIZACIÓN
export const init = async () => {
    try {
        // Formulario
        inicializarRegistro();
        cargarPerfilUsuario();

        // obteniendo y dibujando productos
        const productos = await Model.obtenerProductos();
        View.renderizarProductos(productos);
        actualizarCarrito();
        
        // Eventos Header
        menuHamburguesa();
        botonesCarrito();
        buscador();
        filtrosCategoria();
        
        // Eventos Dinámicos (Tarjetas y Carrito Lateral)
        botonesProductos();
        controlLateral();
    } catch (error) {
        console.error("Hubo un problema al iniciar la app:", error);
    }
};
