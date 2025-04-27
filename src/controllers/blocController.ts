//lin
import type { Request, Response } from 'express';
import Bloc from '../models/bloc';
export class blocController {

  // Mostramos todas las publicaciones
  static getAll = async (req: Request, res: Response) => {
    try {
      const publicacion = await Bloc.findAll({
        order: [['id_publicacion', 'ASC']], //ordenamos en ascendente con la PK
      });
      res.json(publicacion); // solo se ejecuta dando repsuesta con fromato JSon
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener las publicaciones', details: error.message });
    }
  };

  // Mostramos publicaciones por ID en url 
  static getId = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const publicaciones = await Bloc.findByPk(id)
      if (!publicaciones) {
        const error = new Error('Publicacion no encontrada')
        res.status(404).json({ error: error.message });
      }
      res.json(publicaciones);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener las publicaciones por id ', details: error.message });
    }
  };

  // Crear una nueva publicacion
  static crearBloc = async (req: Request, res: Response) => {
    try {
      const publicacion = new Bloc(req.body);
      await publicacion.save();
      res.status(201).json({ mensaje: 'publicacion creada correctamente', publicacion }); // Se agrega el consumo creado si no comentar 
    } catch (error) {
      res.status(500).json({ error: 'Error al crear la publicacion', details: error.message });
    }
  };

  // Actualizar una publicacion
  static actualizarBloc = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const [rowsUpdated] = await Bloc.update(req.body, {
        where: { id_publicacion: id },
      });
      if (rowsUpdated === 0) {
      res.status(404).json({ error: 'Publicacion no encontrada' });
      }

      res.json({ mensaje: 'Invernadero actualizado correctamente' });
    } catch (error) {
      console.error('Error al actualizar Publicacion:', error);
      res.status(500).json({ 
        error: 'Error al actualizar La publicacionn', 
        detalles: error instanceof Error ? error.message : String(error) 
      });
    }
  };
  

  // Eliminar una publicacion
  static eliminarBloc = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const deleted = await Bloc.destroy({ where: { id_publicacion: id } });
      if (deleted === 0) {
        res.status(404).json({ error: 'Publicacion no encontrada ' });
        return;
      }
      res.json({ mensaje: 'Publicacion eliminada correctamente' });
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar la publicac', details: error.message });
    }
  };
}
