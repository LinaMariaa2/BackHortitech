import { Request, Response, NextFunction } from 'express';
import { body, param, validationResult } from 'express-validator';
import { Bloc } from '../models/bloc'
import { Zona } from '../models/zona'

export const validateBlocId = async (req: Request, res: Response, next: NextFunction) => {
  await param('id')
    .isInt({ gt: 0 }).withMessage('El ID de la publicacion debe ser un número entero positivo')
    .toInt()
    .custom(async (value) => {
      const publicacion = await Bloc.findByPk(value);
      if (!publicacion) {
        throw new Error('El ID no corresponde a una publicacion existente');
      }
    })
    .run(req);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errores: errors.array() });
  }
  next();
};

export const validateZona = async (req: Request, res: Response, next: NextFunction) => {
    const { id_zona } = req.body;
    if (id_zona) {
      const zona = await Zona.findByPk(id_zona);
      if (!zona) {
        res.status(400).json({ error: 'La zona especificada no existe.' });
      }
    }
  next();
};

export const validateBlocBody = [
    // Validamos la fecha de publicación
    body('fecha_publicacion')
      .notEmpty().withMessage('La fecha de publicación no puede estar vacía')
      .isISO8601().withMessage('La fecha de publicación debe tener un formato válido (YYYY-MM-DD)'),
  
    // Validamos el contenido de la publicación
    body('contenido')
      .notEmpty().withMessage('El contenido de la publicación no puede estar vacío')
      .isString().withMessage('El contenido debe ser un texto'),
  
    // Validamos la hora de publicación
    body('hora_publicacion')
    .optional()
    .matches(/^([0-9]{2}):([0-9]{2}):([0-9]{2})$/).withMessage('La hora de publicación debe ser una hora válida (HH:mm:ss)'),

    // Validamos la importancia de la publicacion
    body('importancia')
      .optional()
      .isIn(['bajo', 'medio', 'alto']).withMessage('La importancia debe ser "bajo", "medio" o "alto"'),
  ];