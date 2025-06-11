// middleware/validatePersonaRegistro.ts
import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const validatePersonaRegistro = [
  body('nombre_usuario')
    .notEmpty().withMessage('El nombre es obligatorio')
    .isString().withMessage('Debe ser texto')
    .trim(),

  body('correo')
    .notEmpty().withMessage('El correo es obligatorio')
    .isEmail().withMessage('Debe tener formato válido')
    .normalizeEmail(),

  body('contrasena')
    .notEmpty().withMessage('La contraseña es obligatoria')
    .isString().withMessage('Debe ser texto')
    .isLength({ min: 6 }).withMessage('Mínimo 6 caracteres'),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errores: errors.array() });
    }
    next();
  }
];
