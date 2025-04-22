import { Request, Response } from 'express';
import { Bloc } from '../models/bloc';

export class blocController {
    //obtener los blocs
    static getAll(req: Request, res: Response): void {
        Bloc.findAll()
          .then((blocs) => {
            res.json(blocs);
          })
          .catch((error) => {
            console.error('Error al obtener las notas:', error);  // Agrega error detallado
            res.status(500).json({ error: 'Error al obtener las notas' });
          });
    }
    //crear una nueva nota de bloc
    static crearBloc(req: Request, res: Response): void {
        Bloc.create(req.body)
        .then((nuevoBloc) => {
            res.status(201).json(nuevoBloc);
        })
        .catch((error) => {
            res.status(500).json({error: 'Error al crear el bloc' });
        });
    }

    static actualizarBloc(req: Request, res: Response): void {
        const { id } = req.params; // cuando el id va en la url /4
        Bloc.update(req.body, { where: { id_publicacion: id } }) // id del modelo = id 
        .then(([rowsUpdated]) => {
            if (rowsUpdated === 0) {
            return res.status(404).json({ error: 'publicacion no encontrada' });
            }
            res.json({ mensaje: 'publicacion actualizada correctamente' });
            // error para saber si existe o no el id 
            if (isNaN(Number(id))) {
                return res.status(400).json({ error: 'ID inválido' });
            }
        })
        .catch((error) => {
            res.status(500).json({ error: 'Error al actualizar la publicacion' });
        });
    }

    static eliminarBloc(req: Request, res: Response): void {
        const { id } = req.params;
        Bloc.destroy({ where: { id_publicacion : id } })
        .then((deleted) => {
            if (deleted === 0) {
            return res.status(404).json({ error: 'Publicacion no encontrado' });
            }
            res.json({ mensaje: 'publicacion eliminada correctamente' });
        })
        .catch((error) => {
            console.error('Error al eliminar el publicacion:', error);  // Log del error
            res.status(500).json({ error: 'Error al eliminar la publicacion', details: error });
        });
        }

}

