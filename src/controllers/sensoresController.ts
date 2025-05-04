// Jerson Esteban
import { Request, Response } from 'express';
import { Sensores } from '../models/sensores';

export class sensoresController {
  // Mostramos todos los sensores
  static getAll = async (req: Request, res: Response) => {
    try {
      const sensores = await Sensores.findAll({
        order: [['id_sensor', 'ASC']], //ordenamos en ascendente con la PK
      });
      res.json(sensores); // solo se ejecuta
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los sensores registrados', details: error.message });
    }
  };

  // Mostramos sensores por ID en url 
  static getId = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const sensor = await Sensores.findByPk(id)
      if (!sensor) {
        const error = new Error('Sensor No encontrado/ No registrado')
        res.status(404).json({ error: error.message });
      }
      res.json(sensor);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener el sensor', details: error.message });
    }
  };

  // Crear un nuevo registro de sensor 
  static crearSensores = async (req: Request, res: Response) => {
    try {
      const sensor = new Sensores(req.body);
      await sensor.save();
      res.status(201).json({ mensaje: 'Registro sensor creado correctamente', sensor });
    } catch (error) {
      res.status(500).json({ error: 'Error al crear el registro de sensor', details: error.message });
    }
  };

  // Actualizar un registro de un sensor existente
  static actualizarSensores = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const [rowsUpdated] = await Sensores.update(req.body, {
        where: { id_sensor: id },
      });
      if (rowsUpdated === 0) {
      res.status(404).json({ error: 'Registro sensor no encontrado' });
      }

      res.json({ mensaje: 'Registro sensor actualizado correctamente' });
    } catch (error: any) {
      console.error('Error al actualizar registro sensor:', error);
      res.status(500).json({ 
        error: 'Error al actualizar el registro del sensor ', 
        detalles: error instanceof Error ? error.message : String(error) 
      });
    }
  };
  

  // Eliminar un registro sensor
  static eliminarSensores = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const deleted = await Sensores.destroy({ where: { id_sensor: id } });
      if (deleted === 0) {
        res.status(404).json({ error: 'Regsitro sensor no encontrado' });
        return;
      }
      res.json({ mensaje: 'Regsitro sensor  eliminado correctamente' });
    } catch (error: any) {
      res.status(500).json({ error: 'Error al eliminar el registro del sensor ', details: error.message });
    }
  };
}
