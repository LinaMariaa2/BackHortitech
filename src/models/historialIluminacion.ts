import {Table,Column,Model,DataType,ForeignKey,BelongsTo,} from 'sequelize-typescript';
import { ProgramacionIluminacion } from './programacionIluminacion'; 
  
  @Table({ tableName: 'tbl_historial_iluminacion' })
  export class HistorialIluminacion extends Model {
    @Column({ primaryKey: true, autoIncrement: true })
    id_historial_iluminacion: number;
  
    @ForeignKey(() => ProgramacionIluminacion)
    @Column({ type: DataType.INTEGER, allowNull: false, onDelete: 'CASCADE' })
    id_iluminacion: number;
  
    @Column({ type: DataType.DATE, allowNull: false })
    fecha_activacion: Date; // Sequelize usa DATE para representar TIMESTAMP
  
    @Column({ type: DataType.INTEGER, allowNull: false })
    duracion: number;
  
    @BelongsTo(() => ProgramacionIluminacion)
    programacionIluminacion: ProgramacionIluminacion;
}
  
export default HistorialIluminacion;