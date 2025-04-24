import { Router } from 'express'
import { zonaController } from '../controllers/zonaController'

const router = Router();

router.get('/', zonaController.getAll);
router.get('/:id', zonaController.getId);
router.post('/', zonaController.crearZona);
router.put('/:id', zonaController.actualizarZona);
router.delete('/:id', zonaController.eliminarZona);

export default router;