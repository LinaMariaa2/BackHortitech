import { Request, Response, NextFunction } from 'express';
import { body, param, validationResult } from 'express-validator';
import { Invernadero } from '../models/invernadero'

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
    res.status(400).json({ errores: errors.array() });
  }

  next();
};

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
     res.status(400).json({ errores: errors.array() });
  }

  next();
};


// Validar el cuerpo (body) para crear/actualizar invernadero
export const validateInvernaderoBody = [
  body('nombre')
    .notEmpty().withMessage('El nombre no puede estar vacío')
    .isLength({ max: 50 }).withMessage('El nombre no puede tener más de 50 caracteres'),

  body('descripcion')
    .optional()
    .isString().withMessage('La descripción debe ser un texto'),

  body('fecha_creacion')
    .optional()
    .isISO8601().withMessage('La fecha de creación debe ser una fecha válida'),

  body('estado')
    .optional()
    .isIn(['activo', 'inactivo']).withMessage('El estado debe ser "activo" o "inactivo"'),

  body('responsable')
    .optional()
    .isLength({ max: 100 }).withMessage('El responsable no puede tener más de 100 caracteres'),
];
