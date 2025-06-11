import { Request, Response, NextFunction } from "express";
import {param, validationResult, body} from "express-validator";
import Persona from '../models/persona'
import Zona from "../models/zona";

export const validatePersonaId = async (req: Request, res: Response, next: NextFunction) => {
  await param('id')
    .isInt({ gt: 0 }).withMessage('el Id de persona debe ser un nuemro entero positivo')
    .toInt()
    .custom(async (value) => {
      const persona = await Persona.findByPk(value);
      if (!persona) {
        throw new Error('El ID no corresponde a una persona existente');
      }
    })
    .run(req);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errores: errors.array() });
    }
    next();
  };
  
  export const validatePersonaBody = [
    body('nombre_usuario')
        .notEmpty().withMessage('El nombre es obligatorio')
        .isString().withMessage('El nombre debe ser una cadena de texto')
        .trim(),
    body('rol')
        .notEmpty().withMessage('El rol es obligatorio')
        .isString().withMessage('El rol debe ser una cadena de texto')
        .trim(),
    body('id_zona')
        .isInt({ gt: 0 }).withMessage('El ID de zona debe ser un número entero positivo')
        .toInt()
        .custom(async (value) => {
            const zona = await Zona.findByPk(value);
            if (!zona) {
                throw new Error('El ID de zona no corresponde a una zona existente');
            }
        }),
    body('correo')
        .notEmpty().withMessage('El correo es obligatorio')
        .isEmail().withMessage('El correo debe tener un formato válido')
        .trim()
        .normalizeEmail(),
    body('contrasena')
        .isString().withMessage('La contraseña debe ser una cadena de texto')
        .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    body('telefono')
        .isString().withMessage('El teléfono debe ser una cadena de texto')
        .trim(),
        body('fecha_creacion')
        .optional() // Permite que el campo esté ausente
        .isISO8601({ strict: true }).withMessage('La fecha de creación debe tener un formato de fecha válido (YYYY-MM-DDTHH:mm:ss.sssZ o similar)')
        .toDate(), // Convierte el valor a un objeto Date

    body('fecha_eliminacion')
        .optional() // Permite que el campo esté ausente
        .isISO8601({ strict: true }).withMessage('La fecha de eliminación debe tener un formato de fecha válido (YYYY-MM-DDTHH:mm:ss.sssZ o similar)')
        .toDate()
        .custom((value, { req }) => {
            if (value && req.body.fecha_creacion && value <= req.body.fecha_creacion) {
                throw new Error('La fecha de eliminación debe ser posterior a la fecha de creación');
            }
            return true;
        }),

    body('estado')
        .optional() 
        .isIn(['activo', 'inactivo']).withMessage('El estado debe ser "activo" o "inactivo"'),

    // Puedes agregar validaciones para fecha_creacion, fecha_eliminacion, estado, cona si es necesario
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errores: errors.array() });
        }
        next();
    }

  ]