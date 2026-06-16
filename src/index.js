// --- IMPORTACIONES ---
import environment from "./config/environment.js";
import express from "express";
import cors from "cors";
import { obtenerProductos, obtenerProductoPorId, registrarVenta } from "./controllers/productControllers.js";

//IMPORTACIONES PARA EL MANEJO DE RUTAS
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { log } from "console";

//CONFIGURACION DE RUTAS ABSOLUTAS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = environment.PORT;

// --- MIDDLEWARES ---
app.use(cors());
app.use(express.json()); // Permite al servidor entender JSON en el body

// Expone los archivos estáticos (CSS, JS del front, imagenes, etc) desde la carpeta public
app.use(express.static(path.join(__dirname, '../public')));  


app.use((req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.url}`);
    next(); 
});

// --- RUTAS API ---
app.get("/api/productos", obtenerProductos); //obtengo todos los productos
app.get("/api/productos/:id", obtenerProductoPorId); //busco un producto por ID
app.post("/api/ventas", registrarVenta);

// RUTAS FRONTEND
app.post("/api/usuarios",(req,res) => {
    console.log("Nuevo usuario intentando registrarse:", req.body);
    res.status(200).json({mensaje: "Usuario recibido correctamente"})
    
})

//Ruta para la página de inicio.
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public", "index.html"));
});

//Ruta para la tienda
app.get("/tienda", (req,res) => {
    res.sendFile(path.join(__dirname, "../public", "tienda.html"));
});

// --- INICIO DEL SERVIDOR ---
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});