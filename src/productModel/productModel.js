import connection from '../database/db.js';

    //Traemos todos los productos...
    export const obtenerProductos = async () => {
        const consultaSQL = 'SELECT * FROM productos'
        const [rows] = await connection.query(consultaSQL);
        // console.log("Productos obtenidos de la base de datos:", rows);
        return rows;
    }
    
    //Traemos solo el producto que coincida con el ID...
    export const obtenerProductoPorId =  async (id) => {
        const consultaSQL = 'SELECT * FROM productos WHERE id = ?'
        const [rows] = await connection.query(consultaSQL, [id]);
        return rows.length > 0 ? rows[0] : null; 
    }

    //guardar las ventas en la DB
    export const guardarVenta = async (usuario, fecha, total) => {
        const consultaSQL = 'INSERT INTO ventas (usuario, fecha, total) VALUES (?, ?, ?)';
        const [resultado] = await connection.query(consultaSQL, [usuario, fecha, total]);
        return resultado;
    };
