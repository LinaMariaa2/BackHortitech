// Lin
import { Request, Response } from 'express';
import { Consumo } from '../models/consumo';

export class consumoController {

  // Obtener todos los consumos
  static async getAll(req: Request, res: Response){
    try {
      const consumo = await Consumo.findAll();
      res.json(consumo);
    } catch (error: any) {
      console.error('❌ Error al obtener los consumo:', error.message);
      res.status(500).json({ error: 'Error al obtener los consumos', details: error.message }); //msj de error detallado 
    }
  }

  // Obtener una publicación por ID
  static async getId(req: Request, res: Response) {
    const { id } = req.params;

    if (isNaN(Number(id))) {
      res.status(400).json({ error: 'ID inválido' });
      return;
    }
    try {
      const consumo = await Consumo.findByPk(id);
      if (!consumo) {
        res.status(404).json({ error: 'consumo no encontrado' });
        return;
      }
      res.json(consumo);
    } catch (error: any) {
      console.error('❌ Error al obtener el consumo:', error.message);
      res.status(500).json({ error: 'Error al obtener el consumo details', details: error.message });
    }
  }

  // Crear una nueva publicación
  static async crearConsumo(req: Request, res: Response) {
    try {
      const nuevoConsumo = await Consumo.create(req.body);
      res.status(201).json(nuevoConsumo);
    } catch (error: any) {
      console.error('❌ Error al crear nuevo consumo', error.message);
      res.status(500).json({ error: 'Error al crear nuevo consumo', details: error.message });
    }
  }

  // Actualizar una publicación existente
  static async actualizarConsumo(req: Request, res: Response) {
    const { id } = req.params;

    if (isNaN(Number(id))) {
      res.status(400).json({ error: 'ID inválido' });
      return;
    }

    try {
      const [rowsUpdated] = await Consumo.update(req.body, {
        where: { id_consumo: id }
      });

      if (rowsUpdated === 0) {
        res.status(404).json({ error: 'Consumo no encontrado' });
        return;
      }
      res.json({ mensaje: 'Consumo actualizado correctamente' });
      
    } catch (error: any) {
      console.error('❌ Error al actualizar el consumo:', error.message);
      res.status(500).json({ error: 'Error al actualizar el consumo', details: error.message });
    }
  }

  // Eliminar una publicación
  static async eliminarConsumo(req: Request, res: Response) {
    const { id } = req.params;

    if (isNaN(Number(id))) {
      res.status(400).json({ error: 'ID inválido' });
      return;
    }

    try {
      const deleted = await Consumo.destroy({ where: { id_consumo: id } });

      if (deleted === 0) {
        res.status(404).json({ error: 'consumo no encontrado' });
        return;
      }

      res.json({ mensaje: 'Consumo eliminado correctamente' });
    } catch (error: any) {
      console.error('❌ Error al eliminar el consumo:', error.message);
      res.status(500).json({ error: 'Error al eliminar el consumo', details: error.message });
    }
  }
}
