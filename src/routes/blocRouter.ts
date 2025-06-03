import { Router } from 'express';
import { blocController } from '../controllers/blocController'
import { validateBlocId, validateZona, validateBlocBody} from '../middleware/blocValidator'
import { handleInputErrors } from '../middleware/validation'; // maneja errores de de validacion
//  handleInputErrors se maneja solo en validaciones con datos entrantes
const router = Router();
router.get('/', blocController.getAll);

router.get('/:id',
    validateBlocId,
    blocController.getId);

router.get('/:id/zona', 
    validateBlocId,
    handleInputErrors,
    blocController.getBlocZona);

router.post('/', 
    validateBlocBody,
    validateZona,
    handleInputErrors,
    blocController.crearBloc);

router.put('/:id', 
    validateBlocId,
    validateBlocBody,
    validateZona,
    handleInputErrors,
    blocController.actualizarBloc);

router.delete('/:id', 
    validateBlocId,
    blocController.eliminarBloc);

export default router;
