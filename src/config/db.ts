import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config(); // Cargar variables de entorno desde .env

// Verificación de variables de entorno necesarias
if (!process.env.PG_HOST || !process.env.PG_USER || !process.env.PG_PASSWORD || !process.env.PG_NAME) {
  console.error('❌ Faltan variables de entorno. Asegúrate de que .env esté correctamente configurado.');
  process.exit(1); // Detener la ejecución si faltan las variables críticas
}

const pool = new Pool({
    host: process.env.PG_HOST || 'localhost',
    port: Number(process.env.PG_PORT) || 5432,
    user: process.env.PG_USER || 'postgres',
    password: process.env.PG_PASSWORD,
    database: process.env.PG_NAME
});


//CONEXION DE PRUEBA
// pool.connect()
//     .then(() => console.log('🔗 Conexión a PostgreSQL establecida'))
//     .catch(err => {
//         console.error('❌ Error al conectar a PostgreSQL:', err);
//         process.exit(1); // Detener el proceso en caso de error en la conexión
//     });
   
export default pool;


