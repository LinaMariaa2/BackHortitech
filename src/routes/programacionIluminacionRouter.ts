import { Router } from 'express';
import { programacionIluminacionController } from '../controllers/programacionIluminacionController';

const router = Router();

router.get('/', programacionIluminacionController.getAll);
router.get('/:id', programacionIluminacionController.getId);
router.post('/', programacionIluminacionController.crearProgramacionIluminacion);
router.put('/:id', programacionIluminacionController.actualizarProgramacionIluminacion);
router.delete('/:id', programacionIluminacionController.eliminarProgramacionIluminacion);

export default router;
