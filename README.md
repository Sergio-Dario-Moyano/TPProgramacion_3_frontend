# TP Programación 3 - Foto Tienda (Full-Stack Autoservicio)

Este proyecto es una aplicación web y API REST completa desarrollada para una tienda de equipos fotográficos ("Foto Tienda"). Provee un frontend interactivo y responsivo para los usuarios, y un backend robusto para gestionar el catálogo conectándose a una base de datos MySQL.

## 🚀 Tecnologías Utilizadas

**Frontend (UI/UX & Lógica):**
* **HTML5 y CSS3 Avanzado:** Diseño 100% responsivo (Mobile-First).
* **Arquitectura CSS Modular:** Uso de importaciones (`variables.css`, `base.css`, `layout.css`, `components.css`) para un código escalable.
* **Layouts Modernos:** Implementación profunda de **CSS Grid** y **Flexbox**.
* **Tipografía y Variables:** Uso de Google Fonts ('Inter') y custom properties (`:root`) para mantener la consistencia visual (Dark Mode por defecto).
* **JavaScript (ES6 Modules):** Arquitectura MVC en el cliente (Modelos, Vistas y Controladores).
* **Web Storage & Fetch API:** Persistencia de datos con `localStorage` y consumo asíncrono del backend.

**Backend (API REST):**
* **Node.js y Express.js:** Servidor y enrutamiento.
* **MySQL:** Base de datos relacional (mediante `mysql2/promise`).
* **Dotenv & Cors:** Manejo seguro de credenciales y control de peticiones cruzadas.

## ✨ Funcionalidades Destacadas

* **Ingreso Personalizado:** Pantalla de bienvenida que captura nombre y email del usuario, personalizando la experiencia y los comprobantes de compra.
* **Catálogo Dinámico y Buscador:** Renderizado de productos desde la base de datos con una barra de búsqueda que filtra en tiempo real por título y descripción.
* **Carrito de Compras Interactivo:**
  * Panel lateral fluido (Off-canvas menu).
  * Funciones para agregar, sumar, restar y eliminar productos con actualización de totales al instante.
  * Animaciones CSS (Keyframes) al agregar productos (`saltito` en el ícono del carrito).
  * Persistencia de datos: el carrito no se pierde si se recarga la página.
* **Checkout (Ticket de Compra):** Al finalizar la transacción, se genera un modal detallado con la fecha exacta, los datos del cliente y el resumen de la operación.
* **Diseño Responsivo:** Adaptación perfecta a dispositivos móviles, tablets (768px) y escritorio (1024px+), incluyendo un menú hamburguesa funcional para pantallas chicas.

## 📁 Estructura del Proyecto

```text
📦 tpprogramacion_3
 ┣ 📂 public                 # Frontend: Archivos estáticos
 ┃ ┣ 📂 css
 ┃ ┃ ┣ 📜 variables.css      # Paleta de colores y variables globales
 ┃ ┃ ┣ 📜 base.css           # Reseteo y tipografías
 ┃ ┃ ┣ 📜 layout.css         # Estructura principal (Grid/Flex)
 ┃ ┃ ┣ 📜 components.css     # Estilos de tarjetas, botones y modales
 ┃ ┃ ┗ 📜 styles.css         # Archivo unificador (@imports)
 ┃ ┣ 📂 js
 ┃ ┃ ┣ 📂 controllers
 ┃ ┃ ┣ 📂 models
 ┃ ┃ ┣ 📂 views
 ┃ ┃ ┗ 📜 main.js            
 ┃ ┣ 📜 index.html           # Landing page de registro
 ┃ ┗ 📜 tienda.html          # Vista principal del catálogo
 ┣ 📂 src                    # Backend: Lógica del servidor
 ┃ ┣ 📂 config
 ┃ ┣ 📂 controllers
 ┃ ┣ 📂 database
 ┃ ┣ 📂 productModel
 ┃ ┗ 📜 index.js             # Entry point de Express
 ┣ 📜 .env                   # Variables de entorno (no versionado)
 ┣ 📜 package.json
 ┗ 📜 README.md