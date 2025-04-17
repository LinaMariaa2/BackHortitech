import { Router} from 'express'
import { consumoController} from '../controllers/consumoController'

const router = Router();

router.get('/',consumoController.getAll);
router.post('/',consumoController.crearConsumo);
router.put('/:id',consumoController.actualizarConsumo);
router.delete('/:id',consumoController.eliminarConsumo);

export default router;