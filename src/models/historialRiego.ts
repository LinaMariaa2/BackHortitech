import {Table,Column,Model,DataType,ForeignKey,BelongsTo,} from 'sequelize-typescript';
import { ProgramacionRiego } from './programacionRiego'; 
  
  @Table({ tableName: 'tbl_historial_riego', timestamps: false })
  export class HistorialRiego extends Model {
    @Column({ primaryKey: true, autoIncrement: true })
    id_historial_riego: number; // identificador 
  
    @ForeignKey(() => ProgramacionRiego)
    @Column({ type: DataType.INTEGER, allowNull: false, onDelete: 'CASCADE' })
    id_pg_riego: number;
  
    @Column({ type: DataType.DATE, allowNull: false })
    fecha_activacion: Date; // Sequelize maneja TIMESTAMP como DATE
  
    @Column({ type: DataType.INTEGER, allowNull: false })
    duracion: number;
  
    @BelongsTo(() => ProgramacionRiego)
    programacionRiego: ProgramacionRiego;
}
export default HistorialRiego;  