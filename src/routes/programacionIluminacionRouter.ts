import { Router } from 'express';
import { programacionIluminacionController } from '../controllers/programacionIluminacionController';
import {validateProgramacionIluminacionId,validateProgramacionIluminacionBody,} from '../middleware/programacionIluminacionValidator';
import { handleInputErrors } from '../middleware/validation';

const router = Router();

router.get('/', programacionIluminacionController.getAll);
router.get(
  '/:id',
  validateProgramacionIluminacionId,
  handleInputErrors,
  programacionIluminacionController.getId
);
router.post(
  '/',
  validateProgramacionIluminacionBody,
  handleInputErrors,
  programacionIluminacionController.crearProgramacionIluminacion
);
router.put(
  '/:id',
  validateProgramacionIluminacionId,
  validateProgramacionIluminacionBody,
  handleInputErrors,
  programacionIluminacionController.actualizarProgramacionIluminacion
);
router.delete(
  '/:id',
  validateProgramacionIluminacionId,
  handleInputErrors,
  programacionIluminacionController.eliminarProgramacionIluminacion
);

export default router;
