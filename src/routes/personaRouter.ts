import { Router } from 'express';
import { personaController } from '../controllers/personaController';
import { handleInputErrors } from '../middleware/validation';
import {body, param} from 'express-validator'
import{validatePersonaId,  validatePersonaBody} from '../middleware/personaValidator'
const router = Router();

//mostrar todas las personas
router.get('/', personaController.getAll);
//mostrar personas por id
router.get('/:id', 
    validatePersonaId,
    personaController.getId
);

//crear una persona
router.post('/', 
    validatePersonaBody,
    handleInputErrors, 
    personaController.crearPersona);

//actualizar datos de persona
router.put('/:id', 
    validatePersonaId,
    validatePersonaBody, 
    handleInputErrors,
    personaController.actualizarPersona);

//eliminar perosona
router.delete('/:id',
    validatePersonaBody,
    validatePersonaId,
    handleInputErrors,
    personaController.eliminarPersona);

export default router;
