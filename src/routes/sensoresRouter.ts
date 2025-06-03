import { Router } from 'express';
import { handleInputErrors } from '../middleware/validation';
import { sensoresController } from '../controllers/sensoresController';
import { validateSensorId, validateSensoresBody } from '../middleware/sensoresValidator'



const router = Router();
router.get('/', sensoresController.getAll);


router.get('/:id', 
    handleInputErrors,
    validateSensorId,
    sensoresController.getId);

router.post('/', 
    handleInputErrors,
    validateSensorId,
    validateSensoresBody,
    sensoresController.crearSensores);
router.put('/:id', 
    handleInputErrors,
    validateSensorId,
    validateSensoresBody,
    sensoresController.actualizarSensores);
router.delete('/:id', 
    handleInputErrors,
    validateSensorId,

    sensoresController.eliminarSensores);

export default router;
