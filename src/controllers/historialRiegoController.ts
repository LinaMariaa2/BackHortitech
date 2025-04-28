import { Request, Response } from 'express';
import { HistorialRiego } from '../models/historialRiego';

export class historialRiegoController {
    static async getAll(req: Request, res: Response) {
    try {
        const historial = await HistorialRiego.findAll();
        res.status(200).json(historial);
    } catch (error: any) {
        console.error('❌ Error al obtener el historial de riego:', error.message);
        res.status(500).json({
            error: 'Error al obtener el historial de riego',
            details: error.message
        });
    }
}
static async getId(req: Request, res: Response) {
    const { id } = req.params;
    if (isNaN(Number(id))) {
        res.status(400).json({ error: 'ID inválido' });
        return;
    }
    try {
        const historial = await HistorialRiego.findByPk(id);
        if (!historial) {
            res.status(404).json({ error: 'Registro del historial no encontrado' });
            return;
        }
        res.status(200).json(historial);
    } catch (error: any) {
        console.error('❌ Error al obtener el registro del historial:', error.message);
        res.status(500).json({
            error: 'Error al obtener el registro del historial',
            details: error.message
        });
    }
}
static async crearHistorialRiego(req: Request, res: Response) {
    try {
        const nuevoHistorial = await HistorialRiego.create(req.body);
        res.status(201).json(nuevoHistorial);
    } catch (error: any) {
        console.error('❌ Error al crear un registro en el historial de riego:', error.message);
        res.status(500).json({
            error: 'Error al crear un registro en el historial de riego',
            details: error.message
        });
    }
}
static async actualizarHistorialRiego(req: Request, res: Response) {
    const { id } = req.params;

    if (isNaN(Number(id))) {
        res.status(400).json({ error: 'ID inválido' });
        return;
    }
    try {
        const [rowsUpdated] = await HistorialRiego.update(req.body, {
            where: { id_historial_riego: id }
        });
        if (rowsUpdated === 0) {
            res.status(404).json({ error: 'Registro del historial no encontrado' });
            return;
        }
        res.json({ mensaje: 'Registro del historial actualizado correctamente' });
    } catch (error: any) {
        console.error('❌ Error al actualizar el registro del historial de riego:', error.message);
        res.status(500).json({
            error: 'Error al actualizar el registro del historial de riego',
            details: error.message
        });
    }
}
static async eliminarHistorialRiego(req: Request, res: Response) {
    const { id } = req.params;

    if (isNaN(Number(id))) {
        res.status(400).json({ error: 'ID inválido' });
        return;
    }

    try {
        const deleted = await HistorialRiego.destroy({ where: { id_historial_riego: id } });
        if (deleted === 0) {
            res.status(404).json({ error: 'Registro del historial no encontrado' });
            return;
        }
        res.json({ mensaje: 'Registro del historial eliminado correctamente' });
    } catch (error: any) {
        console.error('❌ Error al eliminar el registro del historial de riego:', error.message);
        res.status(500).json({
            error: 'Error al eliminar el registro del historial de riego',
            details: error.message
        });
    }
}
}

