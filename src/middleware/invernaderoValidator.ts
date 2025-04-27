// middleware/invernaderoValidator.ts
import { Request, Response, NextFunction } from 'express';
import { body, param, validationResult } from 'express-validator';
import Invernadero from '../models/invernadero';

// Middleware para validar el ID del invernadero
export const validateInvernaderoId = async (req: Request, res: Response, next: NextFunction) => {
  await param('id')
    .isInt({ gt: 0 }).withMessage('El ID debe ser un número entero positivo')
    .toInt()
    .custom(async (value) => {
      const invernadero = await Invernadero.findByPk(value);
      if (!invernadero) {
        throw new Error('El ID no corresponde a un invernadero existente');
      }
    })
    .run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errores: errors.array() });
  }

  next();
};

// Middleware para verificar que el nombre no esté duplicado
export const validateInvernaderoNombreUnico = async (req: Request, res: Response, next: NextFunction) => {
  await body('nombre')
    .custom(async (value, { req }) => {
      const existente = await Invernadero.findOne({ where: { nombre: value } });
      if (existente && String(existente.id_invernadero) !== req.params.id) {
        throw new Error('Ya existe un invernadero con este nombre');
      }
    })
    .run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errores: errors.array() });
  }

  next();
};
