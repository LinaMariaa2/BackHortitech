import { Router } from 'express';
import { lecturaSensoresController } from '../controllers/lecturaSensoresController';

const router = Router();

router.get('/', lecturaSensoresController.getAll);
router.get('/:id', lecturaSensoresController.getId);
router.post('/', lecturaSensoresController.crearLecturaSensores);
router.put('/:id', lecturaSensoresController.actualizarLecturaSensores);
router.delete('/:id', lecturaSensoresController.eliminarLecturaSensores);

export default router;
