// Maria Paula
import { Request, Response } from 'express';
import { HistorialIluminacion} from '../models/historialIluminacion';
export class historialIluminacionController {
static async getAll(req: Request, res: Response){
    try {
    const historial = await HistorialIluminacion.findAll();
    res.json(historial);
    } catch (error: any) {
    console.error('❌ Error al obtener el historial de iluminación:', error.message);
    res.status(500).json({ error: 'Error al obtener el historial de iluminación', details: error.message }); 
    }
}
static async getId(req: Request, res: Response) {
    const { id } = req.params;

    if (isNaN(Number(id))) {
        res.status(400).json({ error: 'ID inválido' });
        return;
    }
    try {
        const historial = await HistorialIluminacion.findByPk(id);
        if (!historial) {
        res.status(404).json({ error: 'Registro del historial no encontrado' });
        return;
    }
    res.json(historial);
    } catch (error: any) {
        console.error('❌ Error al obtener el registro del historial:', error.message);
        res.status(500).json({ error: 'Error al obtener el registro del historial', details: error.message });
    }
}
static async crearHistorial(req: Request, res: Response) {
    try {
        const nuevoHistorial = await HistorialIluminacion.create(req.body);
        res.status(201).json(nuevoHistorial);
    } catch (error: any) {
        console.error('❌ Error al crear un registro en el historial:', error.message);
        res.status(500).json({ error: 'Error al crear un registro en el historial', details: error.message });
    }
}
static async actualizarHistorial(req: Request, res: Response) {
    const { id } = req.params;

    if (isNaN(Number(id))) {
        res.status(400).json({ error: 'ID inválido' });
        return;
    }

    try {
        const [rowsUpdated] = await HistorialIluminacion.update(req.body, {
        where: { id_historial_iluminacion: id }
    });
    
    if (rowsUpdated === 0) {
        res.status(404).json({ error: 'Registro del historial no encontrado' });
        return;
    }
    
    res.json({ mensaje: 'Registro del historial actualizado correctamente' });
    } catch (error: any) {
        console.error('❌ Error al actualizar el registro del historial:', error.message);
        res.status(500).json({ error: 'Error al actualizar el registro del historial', details: error.message });
    }
}

static async eliminarHistorial(req: Request, res: Response) {
    const { id } = req.params;

    if (isNaN(Number(id))) {
        res.status(400).json({ error: 'ID inválido' });
        return;
    }

    try {
        const deleted = await HistorialIluminacion.destroy({ where: { id_historial_iluminacion: id } });
        if (deleted === 0) {
        res.status(404).json({ error: 'Registro del historial no encontrado' });
        return;
    }
    res.json({ mensaje: 'Registro del historial eliminado correctamente' });
    } catch (error: any) {
        console.error('❌ Error al eliminar el registro del historial:', error.message);
        res.status(500).json({ error: 'Error al eliminar el registro del historial', details: error.message });
    }
}
}
