import { Router } from 'express';
import { invernaderoController } from '../controllers/invernaderoController';
import { validateInvernaderoId } from '../middleware/invernaderoValidator';
import { handleInputErrors } from '../middleware/validation';

const router = Router();

// Obtener todos los invernaderos (sin validación de ID)
router.get('/', invernaderoController.getAll);

// Obtener un invernadero por ID
router.get(
  '/:id',
// validateInvernaderoId,
  handleInputErrors,
  invernaderoController.getId
);

// Crear un nuevo invernadero
router.post(
  '/',
  // validateInvernaderoBody,
  handleInputErrors,
  invernaderoController.crearInvernadero
);

// Actualizar un invernadero
router.put(
  '/:id',
  // validateInvernaderoId,
  // validateInvernaderoBody,
  handleInputErrors,
  invernaderoController.actualizarInvernadero
);

// Eliminar un invernadero
router.delete(
  '/:id',
// validateInvernaderoId,
  handleInputErrors,
  invernaderoController.eliminarInvernadero
);

export default router;
