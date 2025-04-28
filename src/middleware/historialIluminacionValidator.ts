import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import { ProgramacionIluminacion } from '../models/programacionIluminacion';

export const validarHistorialIluminacion = [
    
body('id_iluminacion')
    .isInt({ gt: 0 }).withMessage('El campo id_iluminacion debe ser un número entero positivo')
    .toInt()
    .custom(async (value) => {
        const programacion = await ProgramacionIluminacion.findByPk(value);
        if (!programacion) {
        throw new Error('El id_iluminacion no corresponde a un registro válido en ProgramacionIluminacion');
    }
    }),
body('fecha_activacion')
    .isISO8601().withMessage('El campo fecha_activacion debe ser una fecha válida en formato ISO8601'),

body('duracion')
    .isInt({ gt: 0 }).withMessage('El campo duracion debe ser un número entero positivo')
    .toInt(),
(req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errores: errors.array() });
    }
    next();
}
];
