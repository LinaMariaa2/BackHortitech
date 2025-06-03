import { Request, Response, NextFunction } from 'express';
import { body, param, validationResult } from 'express-validator';
import { Sensores } from '../models/sensores'

export const validateSensorId = async (req: Request, res: Response, next: NextFunction) => {
  await param('id')
    .isInt({ gt: 0 }).withMessage('El ID asiganado al sensor debe ser un número entero positivo')
    .toInt()
    .custom(async (value) => {
      const sensor = await Sensores.findByPk(value);
      if (!sensor) {
        throw new Error('El ID no corresponde a un sensor registrad y existente');
      }
    })
    .run(req);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errores: errors.array() });
  }
  next();
};
// No asignamos dependencias de programacion porqu cuando querramos guardar sensores nuevos es necesario solo tener id y seguir parametros nada mas 

export const validateSensoresBody = [
   
    body('tipo_sensor')
      .notEmpty().withMessage('el nombre no puede estar vacio')
      .isLength({ max: 50}).withMessage('el nombre debe tener menos de 50 caracteres'),

    body('estado')
    .optional()
    .isIn(['activo', 'inactivo']).withMessage('El estado debe ser seleccionado de las opciones disponibles '),

    ];