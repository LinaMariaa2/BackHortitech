// Jerson Esteban
import { Request, Response } from 'express'; //
import { Zona } from '../models/zona';
import { Invernadero } from '../models/invernadero';

// listar todas las zonas 
export class zonaController {
  // Mostramos todas las zonas 
  static getAll = async (req: Request, res: Response) => {
    try {
      const zonas = await Zona.findAll({
        order: [['id_zona', 'ASC']], //ordenamos en ascendente con la PK
      });
      res.json(zonas); // solo se ejecuta
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener las zonas', details: error.message });
    }
  };
  // traemos una zona por ID
  static getId = async (req: Request, res:Response) =>{
    try{
        const { id } = req.params;
              const zona = await Zona.findByPk(id)
              if (!zona) {
                const error = new Error('Zona no encontrada')
                res.status(404).json({ error: error.message });
              }
              res.json(zona);
    }catch (error) {
        res.status(500).json({ error: 'Error al obtener la zona', details: error.message })
    }
  };

  // traemos un invernadero por ID
  static getInvernaderoId = async (req: Request, res:Response) =>{
    try{
        const { id } = req.params;
              const zona = await Zona.findByPk(id,{
                include: [Invernadero] // Incluimos el Modelo
              });
              if (!zona) {
                const error = new Error('zona asociada no encontrado')
                res.status(404).json({ error: error.message });
              }

              res.json(zona.invernadero);
    }catch (error) {
        res.status(500).json({ error: 'Error al obtener la zona', details: error.message })
    }
  };

  // Crear una nueva zona 
    static crearZona = async (req: Request, res: Response) => {
      try {
        const zona = new Zona(req.body);
        await zona.save();
        res.status(201).json({ mensaje: 'zona creada correctamente', zona});
      } catch (error) {
        res.status(500).json({ error: 'Error al crear nueva zona', details: error.message });
      }
    };
  
    // Actualizar zona por id
    static actualizarZona = async (req: Request, res: Response) => {
      try {
        const { id } = req.params;
        const [rowsUpdated] = await Zona.update(req.body, {
          where: { id_zona: id },
        });
        if (rowsUpdated === 0) {
        res.status(404).json({ error: 'Zona no encontrada' });
        }
  
        res.json({ mensaje: 'Zona  actualizada correctamente' });
      } catch (error: any) {
        console.error('Error al actualizar Zona:', error);
        res.status(500).json({ 
          error: 'Error al actualizar la zona', 
          detalles: error instanceof Error ? error.message : String(error) 
        });
      }
    };
    
  
    // Eliminamos una zona por id 
    static eliminarZona = async (req: Request, res: Response) => {
      try {
        const { id } = req.params;
        const deleted = await Zona.destroy({ where: { id_zona: id } });
        if (deleted === 0) {
          res.status(404).json({ error: 'Zona no encontrada' });
          return;
        }
        res.json({ mensaje: 'Zona eliminado correctamente' });
      } catch (error: any) {
        res.status(500).json({ error: 'Error al eliminar la zona ', details: error.message });
      }
    };
}
