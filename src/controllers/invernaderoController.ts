import type { Request, Response} from 'express'

export class invernaderoController {
    static getAll = async (req: Request, res: Response) =>{
        console.log('desde/api/invernadero')
    }
    static crearInvernadero = async (req: Request, res: Response) =>{
        console.log('desde/api/invernadero')
    }
    static actualizarInvernadero = async (req: Request, res: Response) =>{
        console.log('desde/api/invernadero')
    }
    static eliminarInvernadero = async (req: Request, res: Response) =>{
        console.log('desde/api/invernadero')
    }
}