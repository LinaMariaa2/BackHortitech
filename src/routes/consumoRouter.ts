import { Router} from 'express'
import { consumoController} from '../controllers/consumoController'
import { handleInputErrors } from '../middleware/validation'; 
import { validateConsumoId, validateHistorialIluminacion, validateHistorialRiego, validateConsumoBody } from '../middleware/consumoValidator'
const router = Router();

router.get('/',consumoController.getAll);

router.get('/:id', 
    validateConsumoId,
    consumoController.getId);

router.post('/',
    validateHistorialIluminacion, 
    validateHistorialRiego, 
    validateConsumoBody,
    handleInputErrors,
    consumoController.crearConsumo);

router.put('/:id',
    validateConsumoId,
    validateHistorialIluminacion, 
    validateHistorialRiego, 
    validateConsumoBody,
    handleInputErrors,
    consumoController.actualizarConsumo);

router.delete('/:id',
    validateConsumoId,
    consumoController.eliminarConsumo);

export default router;