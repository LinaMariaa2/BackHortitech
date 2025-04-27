import { Request, Response, NextFunction } from 'express';
import { body, param, validationResult } from 'express-validator';
import { Consumo } from '../models/consumo'
import { HistorialIluminacion } from '../models/historialIluminacion'
import { HistorialRiego } from '../models/historialRiego'

export const validateConsumoId = async (req: Request, res: Response, next: NextFunction) => {
  await param('id')
    .isInt({ gt: 0 }).withMessage('El ID asiganado al consumo debe ser un número entero positivo')
    .toInt()
    .custom(async (value) => {
      const consumo = await Consumo.findByPk(value);
      if (!consumo) {
        throw new Error('El ID no corresponde a un consumo existente');
      }
    })
    .run(req);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errores: errors.array() });
  }
  next();
};

export const validateHistorialIluminacion = async (req: Request, res: Response, next: NextFunction) => {
    const { id_historial_iluminacion } = req.body;
    if (id_historial_iluminacion) {
      const historial = await HistorialIluminacion.findByPk(id_historial_iluminacion);
      if (!historial) {
        res.status(400).json({ error: 'El historial especificado no existe revisar(data).' });
      }
    }
  next();
};

export const validateHistorialRiego = async (req: Request, res: Response, next: NextFunction) => {
    const { id_historial_riego } = req.body;
    if (id_historial_riego) {
      const historial = await HistorialRiego.findByPk(id_historial_riego);
      if (!historial) {
        res.status(400).json({ error: 'El historial especificado no existe revisar(data).' });
      }
    }
  next();
};

export const validateConsumoBody = [
    // Validamos la fecha
    body('fecha')
      .notEmpty().withMessage('La fecha de la toma de los datos de los sensores no puede estar vacía')
      .isISO8601().withMessage('La fecha debe tener un formato válido (YYYY-MM-DD)'),
  
    // Validamos el consumo de agua
    body('consumo_agua')
      .notEmpty().withMessage('El dato no puede estar vacío')
      .isFloat().withMessage('El dato entrante debe ser flotante'),
  
    // Validamos lel consumo de energia ( con estos datos sacamos estadisticas generales )
    body('consumo_energia')
      .optional()
      .isFloat().withMessage('el dato debe ser flotante '),
  
    ];