import express from 'express';
import colors from 'colors';
import morgan from 'morgan';
import sequelize from './config/db'; // tu instancia de Sequelize
import invernaderoRouter from './routes/invernaderoRouter'; // ejemplo de router que puedes tener

async function connectDB() {
  try {
    await sequelize.authenticate(); // Verifica la conexión
    console.log(colors.green.bold('✅ Conexión a Sequelize establecida'));

    // Sincroniza modelos
    await sequelize.sync(); 

    // Consulta de prueba
    try {
      const [results] = await sequelize.query('SELECT * FROM tbl_consumo LIMIT 5');
      console.log(colors.blue('📄 Datos de prueba:'), results);
    } catch (err) {
      console.error(colors.red('❌ Error al hacer la consulta de prueba:'), err);
    }

  } catch (error) {
    console.error(colors.red('❌ Falló la conexión a la base de datos:'), error);
    process.exit(1);
  }
}

connectDB();
const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use('/api/invernadero', invernaderoRouter);
export default app;
