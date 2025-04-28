import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import { ProgramacionRiego } from '../models/programacionRiego';

export const validarHistorialRiego = [
    
    body('id_pg_riego')
    .isInt({ gt: 0 }).withMessage('El campo id_pg_riego debe ser un número entero positivo')
    .toInt()
    .custom(async (value) => {
        const programacion = await ProgramacionRiego.findByPk(value);
        if (!programacion) {
            throw new Error('El id_pg_riego no corresponde a un registro válido en ProgramacionRiego');
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
            res.status(400).json({ errores: errors.array() });
            return;
    }
    next();
}
];