import { Request, Response } from 'express';
import ProgramacionRiego from '../models/programacionRiego';

export class programacionRiegoController {
  // Mostrar todas las programaciones de riego
  static getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const programaciones = await ProgramacionRiego.findAll({
        order: [['id_pg_riego', 'ASC']],
      });
      res.json(programaciones);
    } catch (error: any) {
      res.status(500).json({
        error: 'Error al obtener las programaciones de riego',
        details: error.message,
      });
    }
  };

  // Mostrar programación de riego por ID
  static getId = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      if (isNaN(Number(id))) {
        res.status(400).json({ error: 'ID inválido' });
        return;
      }

      const programacion = await ProgramacionRiego.findByPk(id);
      if (!programacion) {
        res.status(404).json({ error: 'Programación de riego no encontrada' });
        return;
      }

      res.json(programacion);
    } catch (error: any) {
      res.status(500).json({
        error: 'Error al obtener la programación de riego',
        details: error.message,
      });
    }
  };

  // Crear una nueva programación de riego
  static crearProgramacionRiego = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const programacion = await ProgramacionRiego.create(req.body);
      res
        .status(201)
        .json({ mensaje: 'Programación de riego creada correctamente', programacion });
    } catch (error: any) {
      res.status(500).json({
        error: 'Error al crear la programación de riego',
        details: error.message,
      });
    }
  };

  // Actualizar una programación de riego
  static actualizarProgramacionRiego = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { id } = req.params;
      if (isNaN(Number(id))) {
        res.status(400).json({ error: 'ID inválido' });
        return;
      }

      const [rowsUpdated] = await ProgramacionRiego.update(req.body, {
        where: { id_pg_riego: id },
      });

      if (rowsUpdated === 0) {
        res.status(404).json({ error: 'Programación de riego no encontrada' });
        return;
      }

      res.json({ mensaje: 'Programación de riego actualizada correctamente' });
    } catch (error: any) {
      res.status(500).json({
        error: 'Error al actualizar la programación de riego',
        details: error.message,
      });
    }
  };

  // Eliminar una programación de riego
  static eliminarProgramacionRiego = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { id } = req.params;
      if (isNaN(Number(id))) {
        res.status(400).json({ error: 'ID inválido' });
        return;
      }

      const deleted = await ProgramacionRiego.destroy({
        where: { id_pg_riego: id },
      });

      if (deleted === 0) {
        res.status(404).json({ error: 'Programación de riego no encontrada' });
        return;
      }

      res.json({ mensaje: 'Programación de riego eliminada correctamente' });
    } catch (error: any) {
      res.status(500).json({
        error: 'Error al eliminar la programación de riego',
        details: error.message,
      });
    }
  };
}
