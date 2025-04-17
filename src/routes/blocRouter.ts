import { Router } from 'express'
import { blocController } from '../controllers/blocController'

const router = Router();

router.get('/', blocController.getAll);
router.post('/', blocController.crearBloc);
router.put('/:id', blocController.actualizarBloc);
router.delete('/:id', blocController.eliminarBloc);

export default router;