import { Router } from 'express';
import { invernaderoController } from '../controllers/invernaderoController';

const router = Router();

router.get('/', invernaderoController.getAll);
router.get('/:id', invernaderoController.getId);
router.post('/', invernaderoController.crearInvernadero);
router.put('/:id', invernaderoController.actualizarInvernadero);
router.delete('/:id', invernaderoController.eliminarInvernadero);

export default router;
