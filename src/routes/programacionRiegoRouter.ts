import { Router } from 'express';
import { programacionRiegoController } from '../controllers/programacionRiegoController';

const router = Router();

router.get('/', programacionRiegoController.getAll);
router.post('/', programacionRiegoController.crearProgramacionRiego);
router.put('/:id', programacionRiegoController.actualizarProgramacionRiego);
router.delete('/:id', programacionRiegoController.eliminarProgramacionRiego);

export default router;
