//lin
import type { Request, Response } from 'express';
import Consumo from '../models/consumo';
export class consumoController {
  // Mostramos todos los consumos
  static getAll = async (req: Request, res: Response) => {
    try {
      const consumo = await Consumo.findAll({
        order: [['id_consumo', 'ASC']], //ordenamos en ascendente con la PK
      });
      res.json(consumo); // solo se ejecuta dando repsuesta con fromato JSon
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los consumos (M,S,D)', details: error.message });
    }
  };

  // Mostramos consumos por ID en url 
  static getId = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const consumo = await Consumo.findByPk(id)
      if (!consumo) {
        const error = new Error('consumo no encontrado')
        res.status(404).json({ error: error.message });
      }
      res.json(consumo);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener el consumo por id', details: error.message });
    }
  };

  // Crear un nuevo invernadero
  static crearConsumo = async (req: Request, res: Response) => {
    try {
      const consumo = new Consumo(req.body);
      await consumo.save();
      res.status(201).json({ mensaje: 'Consumo creado correctamente', consumo }); // Se agrega el consumo creado si no comentar 
    } catch (error) {
      res.status(500).json({ error: 'Error al crear el Consumo', details: error.message });
    }
  };

  // Actualizar un Consumo
  static actualizarConsumo = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const [rowsUpdated] = await Consumo.update(req.body, {
        where: { id_consumo: id },
      });
      if (rowsUpdated === 0) {
      res.status(404).json({ error: 'Consumo no encontrado' });
      }

      res.json({ mensaje: 'Invernadero actualizado correctamente' });
    } catch (error) {
      console.error('Error al actualizar Consumo:', error);
      res.status(500).json({ 
        error: 'Error al actualizar el Consumo', 
        detalles: error instanceof Error ? error.message : String(error) 
      });
    }
  };
  

  // Eliminar un invernadero
  static eliminarConsumo = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const deleted = await Consumo.destroy({ where: { id_consumo: id } });
      if (deleted === 0) {
        res.status(404).json({ error: 'Consumo no encontrado' });
        return;
      }
      res.json({ mensaje: 'Consumo eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar el consumo', details: error.message });
    }
  };
}
