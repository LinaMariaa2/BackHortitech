// Luis Sebastian
import type { Request, Response } from 'express';
import LecturaSensores from '../models/lecturaSensores';
export class lecturaSensoresController {

  //mostramos todas las lecturas
  static getAll = async (req: Request, res: Response) => {
    try {
      const lectura = await LecturaSensores.findAll({
        order: [['id_lectura', 'ASC']],
      });
      res.json(lectura); // solo se ejecuta dando repsuesta con fromato JSon
    } catch (error) {
      res.status(500).json({ error: "error al obtener las lecturas", details: error.message });
    }

  };


  //mostramos lecturas con Id en URL

  static getId = async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const lectura = await LecturaSensores.findByPk(id)
      if (!lectura) {
        const error = new Error('publicacion no encontrada')
        res.status(404).json({ error: error.message })
      }
      res.json(lectura);
    } catch (error) {
      res.status(500).json({ error: 'error al obtener las lecturas por id', details: error.message });
    }
  };

  //crear una nueva lectura

  static crearLecturaSensores = async (req: Request, res: Response) => {
    try {
      const lectura = new LecturaSensores(req.body)
      await lectura.save()
      res.status(201).json("lectura creada correctamente")
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: "Hubo un error" })
    }
  }

  //actualizar una lectura
  static actualizarLecturaSensores = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const [rowsUpdated] = await LecturaSensores.update(req.body, {
        where: { id_lectura: id },
      });
      if (rowsUpdated === 0) {
        res.status(404).json({ error: 'lectura no encontrada' });
      }
      res.json({ mensaje: 'lectura actualizada conrrectamente' });
    } catch (error) {
      console.error('error al actualizar lectura:', error);
      res.status(500).json({
        error: 'error al actualizar la publicacion',
        detaller: error instanceof Error ? error.message : String(error)
      });
    }
  }

  static eliminarLecturaSensores = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const deleted = await LecturaSensores.destroy({ where: { id_lectura: id } });
      if (deleted === 0) {
        res.status(404).json({ error: 'lectura no encontrada' })
        return;
      }
      res.json({ mesaje: 'lectura eliminada correctamente' })
    } catch (error) {
      res.status(500).json({ error: 'error al eliminar la lectura', details: error.message });
    }
  };

}