import { Router } from 'express';
import { programacionRiegoController } from '../controllers/programacionRiegoController';
import {
  validateProgramacionRiegoId,
  validateProgramacionRiegoBody,
} from '../middleware/programacionRiegoValidator';
import { handleInputErrors } from '../middleware/validation';

const router = Router();

router.get('/', programacionRiegoController.getAll);
router.get(
  '/:id',
  validateProgramacionRiegoId,
  handleInputErrors,
  programacionRiegoController.getId
);
router.post(
  '/',
  validateProgramacionRiegoBody,
  handleInputErrors,
  programacionRiegoController.crearProgramacionRiego
);
router.put(
  '/:id',
  validateProgramacionRiegoId,
  validateProgramacionRiegoBody,
  handleInputErrors,
  programacionRiegoController.actualizarProgramacionRiego
);
router.delete(
  '/:id',
  validateProgramacionRiegoId,
  handleInputErrors,
  programacionRiegoController.eliminarProgramacionRiego
);

export default router;