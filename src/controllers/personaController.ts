// Luis Sebastianimport type { Request, Response } from 'express';
import { Persona } from '../models/persona';
import type { Request, Response } from 'express';
export class personaController {

    //mostramos todas as persona con id y nombre
 static getAll = async (req: Request, res: Response) => {
    try {
        const persona = await Persona.findAll({
            order: [['id_persona', 'nombre_usuario', 'ASC']],

        });
        res.json(persona); //solo se ejecuta dando respuesta en formato json
    } catch (error){
        res.status(500).json({error: "error al obtener personas", details: error.message});
    }
 }

 //mostramos lectura con id

 static getId = async (req: Request, res: Response) =>{
    try {
        const {id} = req.params
        const persona = await Persona.findByPk(id)
        if(!persona){
          const error = new Error('persona no encontrada')
          res.status(404).json({error: error.message})
        }
        res.json(persona)
    } catch (error) {
        res.status(500).json({ error: 'error al obtener persona por id', details: error.message });
    }
 };

 //crear una nueva persona
 static crearPersona = async (req: Request, res: Response) =>{
    try{
        const persona = new Persona(req.body)
        await persona.save()
        res.status(201).json("persona creada correctamente")

    }catch (error){
        console.log(error)
    res.status(500).json({error: "error al crear persona"})
    }
 }

 //actualizar datos de persona
 static actualizarPersona = async(req: Request, res: Response) =>{
    try{
        const {id} = req.params;
        const [rowsUpdated] = await Persona.update (req.body, {
            where: {id_persona: id},
        });
        if (rowsUpdated ===0){
            res.status(404).json({error: 'persona no encontrada'});

        }
        res.json({mensaje: 'persona actualizada correctamente'});
    
    }catch (error){
        console.error('error al actializar persona:', error);
        res.status(500).json({
            error: 'error al actualizar persona',
            detaller: error instanceof Error ? error.message : String(error)
        });
    }
 }
//eliminar persona
 static eliminarPersona = async (req: Request, res: Response) =>{
    try{
        const{id} =req.params;
        const deleted = await Persona.destroy ({where: {id_persona: id }});
        if (deleted === 0) {
            res.status(404).json({ error: "persona no encontrada"})
            return;
        }
        res.json({mesaje: 'persona eliminada correctamente'})

    } catch (error) {
        res.status(500).json({ error: 'error al eliminar la lectura', details: error.message });
      }
    };
 }

