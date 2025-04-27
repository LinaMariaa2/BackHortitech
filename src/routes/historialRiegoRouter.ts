import { Router } from 'express'
import { historialRiegoController } from '../controllers/historialRiegoController'

const router = Router();

router.get('/', historialRiegoController.getAll);
router.get('/:id', historialRiegoController.getId);
router.post('/', historialRiegoController.crearHistorialRiego);
router.put('/:id', historialRiegoController.actualizarHistorialRiego);
router.delete('/:id', historialRiegoController.eliminarHistorialRiego);

export default router;