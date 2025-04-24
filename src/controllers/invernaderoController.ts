// Lin
import { Request, Response } from 'express';
import { Invernadero } from '../models/invernadero';

export class invernaderoController {
    //obtener los invernaderos
    static getAll(req: Request, res: Response): void {
        Invernadero.findAll()
          .then((invernaderos) => {
            res.json(invernaderos);
          })
          .catch((error) => {
            console.error('Error al obtener los invernaderos:', error);  // Agrega error detallado
            res.status(500).json({ error: 'Error al obtener los invernaderos' });
          });
    }
    // Obtener una publicación por ID
      static async getId(req: Request, res: Response) {
        const { id } = req.params;
    
        if (isNaN(Number(id))) {
          res.status(400).json({ error: 'ID inválido' });
          return;
        }
        try {
          const invernadero = await Invernadero.findByPk(id);
          if (!invernadero) {
            res.status(404).json({ error: 'Invernadero no encontrado' });
            return;
          }
          res.json(invernadero);
        } catch (error: any) {
          console.error('❌ Error al obtener el invernadero', error.message);
          res.status(500).json({ error: 'Error al obtener el invernadero', details: error.message });
        }
    }
    //crear un nuevo Invernadero
    static crearInvernadero(req: Request, res: Response): void {
        Invernadero.create(req.body)
        .then((nuevoInvernadero) => {
            res.status(201).json(nuevoInvernadero);
        })
        .catch((error) => {
            res.status(500).json({ error: 'Error al crear el invernadero' });
        });
    }
    // Actualizar un ivnernadero 
    static actualizarInvernadero(req: Request, res: Response): void {
        const { id } = req.params; // cuando el id va en la url /4
        Invernadero.update(req.body, { where: { id_invernadero: id } }) // id del modelo = id 
        .then(([rowsUpdated]) => {
            if (rowsUpdated === 0) {
            return res.status(404).json({ error: 'Invernadero no encontrado' });
            }
            res.json({ mensaje: 'Invernadero actualizado correctamente' });
            // perror para saber si existe o no el id 
            if (isNaN(Number(id))) {
                return res.status(400).json({ error: 'ID inválido' });
            }
        })
        .catch((error) => {
            res.status(500).json({ error: 'Error al actualizar el invernadero' });
        });
    }

    static eliminarInvernadero(req: Request, res: Response): void {
        const { id } = req.params;
        Invernadero.destroy({ where: { id_invernadero : id } })
        .then((deleted) => {
            if (deleted === 0) {
            return res.status(404).json({ error: 'Invernadero no encontrado' });
            }
            res.json({ mensaje: 'Invernadero eliminado correctamente' });
        })
        .catch((error) => {
            console.error('Error al eliminar el invernadero:', error);  // Log del error
            res.status(500).json({ error: 'Error al eliminar el invernadero', details: error });
        });
        }

}

