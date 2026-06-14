// Importamos TODAS las funciones del controlador
import * as Controller from './controllers/controller.js';

// Cuando se termina de cargar el DOM, arrancamos la App...
document.addEventListener('DOMContentLoaded', () => {
    Controller.init();
});
