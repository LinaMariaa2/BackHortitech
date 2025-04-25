import { Request, Response } from 'express';
import Invernadero from '../models/invernadero';

export class invernaderoController {
  // Mostrar todos los invernaderos
  static getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const invernaderos = await Invernadero.findAll({
        order: [['id_invernadero', 'ASC']],
      });
      res.json(invernaderos); // solo se ejecuta
    } catch (error: any) {
      res.status(500).json({ error: 'Error al obtener los invernaderos', details: error.message });
    }
  };

  // Mostrar invernadero por ID
  static getId = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      if (isNaN(Number(id))) {
        res.status(400).json({ error: 'ID inválido' });
        return;
      }

      const invernadero = await Invernadero.findByPk(id);
      if (!invernadero) {
        res.status(404).json({ error: 'Invernadero no encontrado' });
        return;
      }

      res.json(invernadero);
    } catch (error: any) {
      res.status(500).json({ error: 'Error al obtener el invernadero', details: error.message });
    }
  };

  // Crear un nuevo invernadero
  static crearInvernadero = async (req: Request, res: Response): Promise<void> => {
    try {
      const invernadero = new Invernadero(req.body);
      await invernadero.save();
      res.status(201).json({ mensaje: 'Invernadero creado correctamente', invernadero });
    } catch (error: any) {
      res.status(500).json({ error: 'Error al crear el invernadero', details: error.message });
    }
  };

  // Actualizar un invernadero
  static actualizarInvernadero = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      if (isNaN(Number(id))) {
        res.status(400).json({ error: 'ID inválido' });
        return;
      }

      const [rowsUpdated] = await Invernadero.update(req.body, {
        where: { id_invernadero: id },
      });

      if (rowsUpdated === 0) {
        res.status(404).json({ error: 'Invernadero no encontrado' });
        return;
      }

      res.json({ mensaje: 'Invernadero actualizado correctamente' });
    } catch (error: any) {
      res.status(500).json({ error: 'Error al actualizar el invernadero', details: error.message });
    }
  };

  // Eliminar un invernadero
  static eliminarInvernadero = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      if (isNaN(Number(id))) {
        res.status(400).json({ error: 'ID inválido' });
        return;
      }

      const deleted = await Invernadero.destroy({ where: { id_invernadero: id } });

      if (deleted === 0) {
        res.status(404).json({ error: 'Invernadero no encontrado' });
        return;
      }

      res.json({ mensaje: 'Invernadero eliminado correctamente' });
    } catch (error: any) {
      res.status(500).json({ error: 'Error al eliminar el invernadero', details: error.message });
    }
  };
}
