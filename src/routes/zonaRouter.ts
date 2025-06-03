import { Router } from 'express'
import { zonaController } from '../controllers/zonaController'
import { validateZonaId, validateInvernadero, validateConsumoBody } from '../middleware/zonaValidator'
import { handleInputErrors } from '../middleware/validation';
const router = Router();

router.get('/', zonaController.getAll);

router.get('/:id', 
    validateZonaId,
    handleInputErrors,
    zonaController.getId);

router.get('/:id/invernadero', 
    validateZonaId,
    handleInputErrors,
    zonaController.getInvernaderoId);

router.post('/', 
    validateInvernadero,
    validateConsumoBody,
    handleInputErrors,
    zonaController.crearZona);

router.put('/:id', 
    validateZonaId,
    validateInvernadero,
    validateConsumoBody,
    handleInputErrors,
    zonaController.actualizarZona);

router.delete('/:id', 
    validateZonaId,
    validateConsumoBody,
    handleInputErrors,
    zonaController.eliminarZona);

export default router;