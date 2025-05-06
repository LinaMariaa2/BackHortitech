import { Request, Response, NextFunction } from 'express';
import { body, param, validationResult } from 'express-validator';
import { Zona } from '../models/zona'
import { Invernadero } from '../models/invernadero'

export const validateZonaId = async (req: Request, res: Response, next: NextFunction) => {
  await param('id')
    .isInt({ gt: 0 }).withMessage('El ID asiganado a la zona debe ser un número entero positivo')
    .toInt()
    .custom(async (value) => {
      const zona = await Zona.findByPk(value);
      if (!zona) {
        throw new Error('El ID no corresponde a una zona existente');
      }
    })
    .run(req);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errores: errors.array() });
  }
  next();
};
// validamos existencia de invernadero para evitar la creacion de zonas sin invernaderos 
export const validateInvernadero = async (req: Request, res: Response, next: NextFunction) => {
    const { id_invernadero } = req.body;
    if (id_invernadero) {
      const inv = await Invernadero.findByPk(id_invernadero);
      if (!inv) {
        res.status(400).json({ error: 'El invernadero especificado no existe revisar(data).' });
      }
    }
  next();
};

export const validateConsumoBody = [
    // nombre
    body('nombre')
      .notEmpty().withMessage('el nombre no puede estar vacio')
      .isLength({ max: 50}).withMessage('el nombre debe tener menos de 50 caracteres'),

    //descripciones_add
    body('descripciones_add')
      .notEmpty().withMessage('El contenido de la publicación no puede estar vacío')
      .isString().withMessage('El contenido debe ser un texto'),

    //tipo_riego 
    body('tipo_riego')
    .optional()
    .isIn(['goteo', 'aspersión', 'manguera', 'inactivo']).withMessage('El estado debe ser seleccionado de las opciones disponibles '),

    //tipo_iluminacion
    body('tipo_iluminacion')
    .optional()
    .isIn(['LED', 'Fluorescentes', 'inactivo']).withMessage('El estado debe ser seleccionado de las opciones disponibles"'),

    //fecha_ultima_activacion
    body('fecha_ultima_activacion')
      .notEmpty().withMessage('La fecha de la ultima activacion no debe estar vacia ')
      .isISO8601().withMessage('La fecha debe tener un formato válido (YYYY-MM-DD)'),
  
    ];