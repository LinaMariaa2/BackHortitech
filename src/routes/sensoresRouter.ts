import { Router } from 'express';
import { sensoresController } from '../controllers/sensoresController';

const router = Router();

router.get('/', sensoresController.getAll);
router.post('/', sensoresController.crearSensores);
router.put('/:id', sensoresController.actualizarSensores);
router.delete('/:id', sensoresController.eliminarSensores);

export default router;
