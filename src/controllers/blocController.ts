// Lin
import { Request, Response } from 'express';
import { Bloc } from '../models/bloc';

export class blocController {

  // Obtener todas las publicaciones
  static async getAll(req: Request, res: Response){
    try {
      const blocs = await Bloc.findAll();
      res.json(blocs);
    } catch (error: any) {
      console.error('❌ Error al obtener las publicaciones:', error.message);
      res.status(500).json({ error: 'Error al obtener las publicaciones', details: error.message }); //msj de error detallado 
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
      const bloc = await Bloc.findByPk(id);
      if (!bloc) {
        res.status(404).json({ error: 'Publicación no encontrada' });
        return;
      }
      res.json(bloc);
    } catch (error: any) {
      console.error('❌ Error al obtener la publicación:', error.message);
      res.status(500).json({ error: 'Error al obtener la publicación', details: error.message });
    }
  }

  // Crear una nueva publicación
  static async crearBloc(req: Request, res: Response) {
    try {
      const nuevoBloc = await Bloc.create(req.body);
      res.status(201).json(nuevoBloc);
    } catch (error: any) {
      console.error('❌ Error al crear la publicación:', error.message);
      res.status(500).json({ error: 'Error al crear la publicación', details: error.message });
    }
  }

  // Actualizar una publicación existente
  static async actualizarBloc(req: Request, res: Response) {
    const { id } = req.params;

    if (isNaN(Number(id))) {
      res.status(400).json({ error: 'ID inválido' });
      return;
    }

    try {
      const [rowsUpdated] = await Bloc.update(req.body, {
        where: { id_publicacion: id }
      });

      if (rowsUpdated === 0) {
        res.status(404).json({ error: 'Publicación no encontrada' });
        return;
      }

      res.json({ mensaje: 'Publicación actualizada correctamente' });
    } catch (error: any) {
      console.error('❌ Error al actualizar la publicación:', error.message);
      res.status(500).json({ error: 'Error al actualizar la publicación', details: error.message });
    }
  }

  // Eliminar una publicación
  static async eliminarBloc(req: Request, res: Response) {
    const { id } = req.params;

    if (isNaN(Number(id))) {
      res.status(400).json({ error: 'ID inválido' });
      return;
    }

    try {
      const deleted = await Bloc.destroy({ where: { id_publicacion: id } });

      if (deleted === 0) {
        res.status(404).json({ error: 'Publicación no encontrada' });
        return;
      }

      res.json({ mensaje: 'Publicación eliminada correctamente' });
    } catch (error: any) {
      console.error('❌ Error al eliminar la publicación:', error.message);
      res.status(500).json({ error: 'Error al eliminar la publicación', details: error.message });
    }
  }
}
