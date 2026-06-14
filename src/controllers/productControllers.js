
// Importamos todas las funciones del archivo productModel bajo el alias "productModel"
import * as productModel from '../productModel/productModel.js';

// Obtenemos todos los productos y los exportamos
export const obtenerProductos = async (req, res) => {
    try {
        const products = await productModel.obtenerProductos();
        
        res.status(200).json(products); //Si todo sale bien, parsea los productos a json
    } catch (error) {
        console.error("Error al obtener los productos:", error); //Si algo falla, mostramos un error por consola
        res.status(500).json({ error: "Error interno del servidor" });
    }
}

// Obtenemos un producto por ID
export const obtenerProductoPorId = async (req, res) => {
    const { id } = req.params; //desestructuramos el ID
    try {
        const product = await productModel.obtenerProductoPorId(id); //pasamos el ID como parametro.
        
        if (!product) {
            return res.status(404).json({ error: "Producto no encontrado" }); //Si el producto no existe, mostramos un mensaje.
        }                                                                     
        res.status(200).json(product); //si existe, se parsea a json
    } catch (error) {
        console.error("Error al obtener el producto:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
}