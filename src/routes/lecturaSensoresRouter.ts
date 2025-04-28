import { Router } from 'express';
import { lecturaSensoresController } from '../controllers/lecturaSensoresController';
import { validateLecturaId, validateLecturaBody } from '../middleware/lecturaSensoresValidato';
import { handleInputErrors } from '../middleware/validation';

const router = Router();

// Mostrar todas las lecturas
router.get('/', lecturaSensoresController.getAll);

// Mostrar lecturas por ID
router.get('/:id',
    validateLecturaId, // Solo el middleware de validación del ID
    lecturaSensoresController.getId
);

// Crear una nueva lectura
router.post('/',
    validateLecturaBody,
    handleInputErrors, // <--- Añade handleInputErrors aquí
    lecturaSensoresController.crearLecturaSensores
);

// Actualizar una lectura
router.put('/:id',
    validateLecturaId,
    validateLecturaBody,
    handleInputErrors,
    lecturaSensoresController.actualizarLecturaSensores
);

// Eliminar una lectura
router.delete('/:id',
    validateLecturaId, // Solo el middleware de validación del ID
    lecturaSensoresController.eliminarLecturaSensores
);

export default router;