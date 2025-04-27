import { Request, Response } from 'express';
import ProgramacionIluminacion from '../models/programacionIluminacion';

export class programacionIluminacionController {
  // Mostrar todas las programaciones de iluminación
  static getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const programaciones = await ProgramacionIluminacion.findAll({
        order: [['id_iluminacion', 'ASC']],
      });
      res.json(programaciones);
    } catch (error: any) {
      res.status(500).json({
        error: 'Error al obtener las programaciones de iluminación',
        details: error.message,
      });
    }
  };

  // Mostrar programación de iluminación por ID
  static getId = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      if (isNaN(Number(id))) {
        res.status(400).json({ error: 'ID inválido' });
        return;
      }

      const programacion = await ProgramacionIluminacion.findByPk(id);
      if (!programacion) {
        res.status(404).json({ error: 'Programación de iluminación no encontrada' });
        return;
      }

      res.json(programacion);
    } catch (error: any) {
      res.status(500).json({
        error: 'Error al obtener la programación de iluminación',
        details: error.message,
      });
    }
  };

  // Crear una nueva programación de iluminación
  static crearProgramacionIluminacion = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const programacion = await ProgramacionIluminacion.create(req.body);
      res
        .status(201)
        .json({ mensaje: 'Programación de iluminación creada correctamente', programacion });
    } catch (error: any) {
      res.status(500).json({
        error: 'Error al crear la programación de iluminación',
        details: error.message,
      });
    }
  };

  // Actualizar una programación de iluminación
  static actualizarProgramacionIluminacion = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { id } = req.params;
      if (isNaN(Number(id))) {
        res.status(400).json({ error: 'ID inválido' });
        return;
      }

      const [rowsUpdated] = await ProgramacionIluminacion.update(req.body, {
        where: { id_iluminacion: id },
      });

      if (rowsUpdated === 0) {
        res.status(404).json({ error: 'Programación de iluminación no encontrada' });
        return;
      }

      res.json({ mensaje: 'Programación de iluminación actualizada correctamente' });
    } catch (error: any) {
      res.status(500).json({
        error: 'Error al actualizar la programación de iluminación',
        details: error.message,
      });
    }
  };

  // Eliminar una programación de iluminación
  static eliminarProgramacionIluminacion = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { id } = req.params;
      if (isNaN(Number(id))) {
        res.status(400).json({ error: 'ID inválido' });
        return;
      }

      const deleted = await ProgramacionIluminacion.destroy({
        where: { id_iluminacion: id },
      });

      if (deleted === 0) {
        res.status(404).json({ error: 'Programación de iluminación no encontrada' });
        return;
      }

      res.json({ mensaje: 'Programación de iluminación eliminada correctamente' });
    } catch (error: any) {
      res.status(500).json({
        error: 'Error al eliminar la programación de iluminación',
        details: error.message,
      });
    }
  };
}