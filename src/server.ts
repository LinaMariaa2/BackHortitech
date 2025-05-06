import express from 'express';
import morgan from 'morgan';
import sequelize from './config/db'; //instancia de Sequelize

// Rutas 
import blocRouter from './routes/blocRouter';
import consumoRouter from './routes/consumoRouter'
import historialIluminacionRouter from './routes/historialIluminacionRouter';
import historialRiegoRouter from './routes/historialRiegoRouter';
import invernaderoRouter from './routes/invernaderoRouter';
import lecturaSensoresRouter from './routes/lecturaSensoresRouter';
import personaRouter from './routes/personaRouter';
import programacionIluminacionRouter from './routes/programacionIluminacionRouter';
import programacionRiegoRouter from './routes/programacionRiegoRouter';
import zonaRouter from './routes/zonaRouter';
import sensores from './routes/sensoresRouter'
// async function connectDB() {
//   try {
//     await sequelize.authenticate(); // Verifica la conexión
//     console.log(colors.green.bold('✅ Conexión a Sequelize establecida'));

//     // Sincroniza modelos
//     await sequelize.sync(); 

//     // Consulta de prueba para verificar el estado y si los datos se sincronizan bien 
//     // try {
//     //   const [results] = await sequelize.query('SELECT * FROM tbl_consumo LIMIT 5');
//     //   console.log(colors.blue('📄 Datos de prueba:'), results);
//     // } catch (err) {
//     //   console.error(colors.red('❌ Error al hacer la consulta de prueba:'), err);
//     // }

//   } catch (error) {
//     console.error(colors.red('❌ Falló la conexión a la base de datos:'), error);
//     process.exit(1);
//   }
// }


const app = express();
app.use(morgan('dev'));
app.use(express.json());

// middlewares de enrutamiento, Thunder Client: http://localhost:3000/api/..
app.use('/api/bloc', blocRouter);
app.use('/api/consumo', consumoRouter);
app.use('/api/historialIluminacion', historialIluminacionRouter);
app.use('/api/historialRiego', historialRiegoRouter);
app.use('/api/invernadero', invernaderoRouter);
app.use('/api/lecturaSensores', lecturaSensoresRouter);
app.use('/api/persona', personaRouter);
app.use('/api/programacionIluminacion', programacionIluminacionRouter);
app.use('/api/programacionRiego', programacionRiegoRouter);
app.use('/api/zona', zonaRouter);

export default app;
