import { Request, Response, NextFunction } from 'express';
import { body, param, validationResult } from 'express-validator';
import ProgramacionRiego from '../models/programacionRiego';
import { Zona } from '../models/zona'; // Verifica la ruta a tu modelo Zona

// Middleware para validar el ID de la programación de riego
export const validateProgramacionRiegoId = async (req: Request, res: Response, next: NextFunction
): Promise<void> => {
  await param('id')
    .isInt({ gt: 0 })
    .withMessage('El ID debe ser un número entero positivo')
    .toInt()
    .custom(async (value) => {
      const programacion = await ProgramacionRiego.findByPk(value);
      if (!programacion) {
        throw new Error('El ID no corresponde a una programación de riego existente');
      }
    }) .run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errores: errors.array() });
    return;
  } next();
};

// Middleware para validar el cuerpo de la petición para crear o actualizar
export const validateProgramacionRiegoBody = async ( req: Request, res: Response, next: NextFunction
): Promise<void> => {
  await body('hora_activacion')
    .optional()
    .isTime({})
    .withMessage('La hora de activación debe tener un formato de hora válido (HH:MM:SS)')
    .run(req);

  await body('hora_desactivacion')
    .optional()
    .isTime({})
    .withMessage('La hora de desactivación debe tener un formato de hora válido (HH:MM:SS)')
    .run(req);

  await body('fecha_inicio')
    .optional()
    .isDate()
    .withMessage('La fecha de inicio debe ser una fecha válida (YYYY-MM-DD)')
    .run(req);

  await body('fecha_finalizacion')
    .optional()
    .isDate()
    .withMessage('La fecha de finalización debe ser una fecha válida (YYYY-MM-DD)')
    .run(req);

  await body('descripcion')
    .optional()
    .isString()
    .withMessage('La descripción debe ser una cadena de texto')
    .run(req);

  await body('tipo_riego')
    .optional()
    .isIn(['goteo', 'aspersión', 'manguera', 'inactivo'])
    .withMessage('El tipo de riego debe ser uno de: goteo, aspersión, manguera, inactivo')
    .run(req);

  await body('id_zona')
    .optional()
    .isInt({ gt: 0 })
    .withMessage('El ID de la zona debe ser un número entero positivo')
    .toInt()
    .custom(async (value) => {
      if (value) {
        const zona = await Zona.findByPk(value);
        if (!zona) {
          throw new Error('El ID de la zona no corresponde a una zona existente');
        }
      }
    }) .run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errores: errors.array() });
    return;
  } next();
};