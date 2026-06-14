//RENDERIZAMOS TODOS LOS PRODUCTOS
export const renderizarProductos = (productos) => {
    const contenedor = document.querySelector('.grid-container');
    if (!contenedor) return;

    // Si no hay productos, mostramos un mensaje
    if (productos.length === 0) {
        contenedor.innerHTML = '<p class="no-results-msg">No se encontraron productos para tu búsqueda.</p>';
        return;
    }
    
    let html = '';
    productos.forEach(prod => {
        html += `
        <div class="card">
            <div class="card-img"><img src="${prod.imagen}" alt="${prod.nombre}"></div>
            <div class="card-info">
                <h3>${prod.nombre}</h3>
                <p class="price">$ ${parseInt(prod.precio)}</p>
                <p class="description">${prod.descripcion}</p>
                <button class="btn-comprar" data-nombre="${prod.nombre}" data-precio="${prod.precio}" data-imagen="${prod.imagen}">
                    AGREGAR AL CARRITO
                </button>
            </div>
        </div>`;
    });
    contenedor.innerHTML = html;
};


//RENDERIZAMOS EL CARRITO
export const renderizarCarritoLateral = (carrito, totalDinero) => {
    const contenedor = document.getElementById('cart-items-container');
    const totalElemento = document.getElementById('cart-total');

    if (!contenedor) return;

    if (carrito.length === 0) {
        contenedor.innerHTML = '<p class="cart-empty-msg">Tu carrito está vacío</p>';
    } else {
        let html = '';
        carrito.forEach((prod, index) => {
            html += `
            <div class="cart-item">
                <img src="${prod.imagen}" alt="${prod.nombre}">
                <div class="cart-item-info">
                    <h4>${prod.nombre}</h4>
                    <p>$${prod.precio}</p>
                </div>
                <div class="cart-controls">
                    <button class="btn-restar" data-index="${index}">-</button>
                    <span>${prod.cantidad}</span>
                    <button class="btn-sumar" data-index="${index}">+</button>
                </div>
                <button class="btn-eliminar" data-index="${index}" title="Eliminar del carrito">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
                    </svg>
                </button>
            </div>`;
        });
        contenedor.innerHTML = html;
    }
    if (totalElemento) totalElemento.textContent = totalDinero.toFixed(2);
};


//RENDERIZAMOS EL TICKET
export const renderizarTicket = (carrito, totalDinero) => {
    const ticketFecha = document.getElementById('ticket-fecha');
    const ticketItemsContainer = document.getElementById('ticket-items');
    const ticketTotalFinal = document.getElementById('ticket-total-final');

    // RENDERIZAMOS LA FECHA DE LA COMPRA
    if (ticketFecha) {
        const hoy = new Date();
        const opcionesFecha = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false };
        ticketFecha.textContent = hoy.toLocaleString('es-AR', opcionesFecha) + ' hs';
    }

    // RENDERIZAMOS LOS ITEMS COMPRADOS
    ticketItemsContainer.innerHTML = '';
    carrito.forEach(prod => {
        ticketItemsContainer.innerHTML += `
            <div class="ticket-item">
                <img src="${prod.imagen}" alt="${prod.nombre}">
                <div class="ticket-item-info">
                    <h4>${prod.nombre}</h4>
                    <p>Cant: ${prod.cantidad} | $${prod.precio} c/u</p>
                </div>
                <div class="ticket-item-total">$${(prod.precio * prod.cantidad).toFixed(2)}</div>
            </div>`;
    });
    ticketTotalFinal.textContent = totalDinero.toFixed(2);
};

//ACTUALIZAR CONTADOR CARRITO
export const actualizarContadorHeader = (cantidad) => {
    const contador = document.querySelector('.cart-count');
    if (contador) contador.textContent = cantidad;
};

// ANIMACIÓN BÁSICA DE BOTONES Y EL LOGO DEL CARRITO
export const animarBotonYCarrito = (botonElement) => {
    const modal = document.querySelector('.modal');
    const iconoCarrito = document.querySelector('.cart-icon');
    
    if(modal) modal.classList.add('modal-visible');
    if(iconoCarrito) iconoCarrito.classList.add('animar');
    
    const textoOriginal = botonElement.textContent;
    botonElement.textContent = '¡PRODUCTO AGREGADO! ✔';
    botonElement.classList.add('agregado');
    
    setTimeout(() => {
        if(modal) modal.classList.remove('modal-visible');
        if(iconoCarrito) iconoCarrito.classList.remove('animar');
        botonElement.textContent = textoOriginal;
        botonElement.classList.remove('agregado');
    }, 1500);
};

//ABRIR Y CERRAR EL MANÚ LATERAL
export const toggleMenuLateral = (abrir) => {
    const panel = document.getElementById('cart-sidebar');
    const overlay = document.getElementById('cart-overlay');
    if(abrir) {
        panel.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    } else {
        panel.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
};

//ABRIR Y CERRAR TICKET
export const toggleTicket = (abrir) => {
    const overlay = document.getElementById('ticket-overlay');
    if(abrir) {
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    } else {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
};

