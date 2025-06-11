import { Router } from 'express';
import { personaController } from '../controllers/personaController';
import { handleInputErrors } from '../middleware/validation';
import { validatePersonaId, validatePersonaBody } from '../middleware/personaValidator';
import { validatePersonaRegistro } from '../middleware/registroValidator';

const router = Router();

// Mostrar todas las personas
router.get('/', personaController.getAll);

// Mostrar persona por ID
router.get('/:id',
    validatePersonaId,
    handleInputErrors,
    personaController.getId
);

// Registro básico desde el frontend (nombre, correo, contraseña)
router.post('/registro',
    validatePersonaRegistro,
    personaController.crearPersona
);

// Crear persona completa (admin u otro backend)
router.post('/',
    validatePersonaBody,
    handleInputErrors,
    personaController.crearPersona
);

// Actualizar persona
router.put('/:id',
    validatePersonaId,
    validatePersonaBody,
    handleInputErrors,
    personaController.actualizarPersona
);

// Eliminar persona
router.delete('/:id',
    validatePersonaId,
    handleInputErrors,
    personaController.eliminarPersona
);

export default router;
