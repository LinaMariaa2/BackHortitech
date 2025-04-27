import { Router } from 'express'
import { historialIluminacionController } from '../controllers/historialIluminacionController'

const router = Router();

router.get('/', historialIluminacionController.getAll);
router.get('/:id', historialIluminacionController.getId);
router.post('/', historialIluminacionController.crearHistorialIluminacion);
router.put('/:id', historialIluminacionController.actualizarHistorialIluminacion);
router.delete('/:id', historialIluminacionController.eliminarHistorialIluminacion);

export default router;