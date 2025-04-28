import { Router } from 'express';
import { historialIluminacionController } from '../controllers/historialIluminacionController';
import { handleInputErrors } from '../middleware/validation'; // Middleware general para manejar errores de entrada

const router = Router();
router.get('/', historialIluminacionController.getAll);
router.get(
  '/:id',
  handleInputErrors,
  historialIluminacionController.getId
);
router.post(
  '/',
  handleInputErrors,
  historialIluminacionController.crearHistorial
);
router.put(
  '/:id',
  handleInputErrors,
  historialIluminacionController.actualizarHistorial
);
router.delete(
  '/:id',
  handleInputErrors,
  historialIluminacionController.eliminarHistorial
);

export default router;
