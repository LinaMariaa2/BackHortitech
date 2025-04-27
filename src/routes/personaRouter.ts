import { Router } from 'express';
import { personaController } from '../controllers/personaController';

const router = Router();

router.get('/', personaController.getAll);
router.get('/:id', personaController.getId);
router.post('/', personaController.crearPersona);
router.put('/:id', personaController.actualizarPersona);
router.delete('/:id', personaController.eliminarPersona);

export default router;
