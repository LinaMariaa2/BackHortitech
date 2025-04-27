import { Router } from 'express';
import { historialRiegoController } from '../controllers/historialRiegoController';
import { validarHistorialRiego } from '../middleware/historialRiegoValidator';
import { handleInputErrors } from '../middleware/validation';

const router = Router();

router.get('/', historialRiegoController.getAll);
router.get(
    '/:id',
    validarHistorialRiego,
    handleInputErrors,
    historialRiegoController.getId
);
router.post(
    '/',
    validarHistorialRiego,
    handleInputErrors,
    historialRiegoController.crearHistorialRiego
);
router.put(
    '/:id',
    validarHistorialRiego,
    handleInputErrors,
    historialRiegoController.actualizarHistorialRiego
);
router.delete(
    '/:id',
    validarHistorialRiego,
    handleInputErrors,
    historialRiegoController.eliminarHistorialRiego
);

export default router;