import { Request, Response, NextFunction } from "express";
import {param, validationResult, body} from "express-validator";
import lecturaSensores from '../models/lecturaSensores'

export const validateLecturaId = async (req: Request, res: Response, next: NextFunction) => {
  await param('id')
    .isInt({ min: 1 }).withMessage('ID no válido, debe ser un entero positivo')
    .run(req);

    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const lectura = await lecturaSensores.findByPk(id);

    if (!lectura) {
      return res.status(404).json({ error: "El ID no corresponde a ninguna lectura" });
    }

  next();
};

export const validateLecturaBody = async (req: Request, res: Response, next: NextFunction) =>{
  await body ('id_lectura')
  .notEmpty().withMessage("el id no puede estar en blanco")
  .isNumeric().withMessage("el id debe ser numerico")
  .run(req);

  await body ('valor')
  .notEmpty().withMessage("el valor no puede estar en blanco")
  .isNumeric().withMessage("el valor debe ser numerico")
  .run(req);

  await body ('fecha_lectura')
  .notEmpty().withMessage('La fecha de lectura no puede estar en blanco')
  .isISO8601().withMessage('La fecha de lectura debe tener un formato de fecha válido (YYYY-MM-DD o similar)')
  .run(req);

  await body('hora_lectura')
    .notEmpty().withMessage('La hora de lectura no puede estar en blanco')
    .matches(/^([0-9]{2}):([0-9]{2}):([0-9]{2})$/).withMessage('La hora de lectura debe tener un formato de hora válido (HH:mm:ss)')
    .run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }