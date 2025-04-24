import { Router } from 'express';
import { blocController } from '../controllers/blocController';
import { body } from 'express-validator'
import { handleInputErrors } from '../middleware/validation';

const router = Router();

router.get('/', blocController.getAll);
router.get('/:id', blocController.getId);
router.post('/', 
    body('')
    
    
    
    blocController.crearBloc);

router.put('/:id', blocController.actualizarBloc);
router.delete('/:id', blocController.eliminarBloc);

export default router;
