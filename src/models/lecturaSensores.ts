import {Table,Column,Model,DataType,ForeignKey,BelongsTo,} from 'sequelize-typescript';
import { Sensores } from './sensores';
  
  @Table({ tableName: 'tbl_lecturas_sensores', timestamps: false })
  export class LecturaSensores extends Model {
    @Column({ primaryKey: true, autoIncrement: true })
    id_lectura: number;
  
    @ForeignKey(() => Sensores)
    @Column({ type: DataType.INTEGER, allowNull: false, onDelete: 'CASCADE' })
    id_sensor: number;
  
    @Column({ type: DataType.INTEGER, allowNull: false })
    valor: number;
  
    @Column({ type: DataType.DATEONLY, allowNull: false })
    fecha_lectura: Date;
  
    @Column({ type: DataType.TIME, allowNull: false })
    hora_lectura: string;
  
    @BelongsTo(() => Sensores)
    sensores: Sensores;
}
export default LecturaSensores;
  