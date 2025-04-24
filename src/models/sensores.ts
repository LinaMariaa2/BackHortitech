import {Table,Column,Model,DataType,ForeignKey,BelongsTo,} from 'sequelize-typescript';
import { ProgramacionRiego } from './programacionRiego';
import { ProgramacionIluminacion } from './programacionIluminacion';
  
  @Table({ tableName: 'tbl_sensores', timestamps: false })
  export class Sensores extends Model {
    @Column({ primaryKey: true, autoIncrement: true })
    id_sensor: number;
  
    @Column({ type: DataType.STRING(50), allowNull: false })
    tipo_sensor: string;
  
    @Column({
      type: DataType.ENUM('activo', 'inactivo'),
      allowNull: true,
    })
    estado: string;
  
    @ForeignKey(() => ProgramacionRiego)
    @Column({ type: DataType.INTEGER, allowNull: true, onDelete: 'CASCADE' })
    id_pg_riego: number;
  
    @ForeignKey(() => ProgramacionIluminacion)
    @Column({ type: DataType.INTEGER, allowNull: true, onDelete: 'CASCADE' })
    id_iluminacion: number;
  
    @BelongsTo(() => ProgramacionRiego)
    programacionRiego: ProgramacionRiego;
  
    @BelongsTo(() => ProgramacionIluminacion)
    programacionIluminacion: ProgramacionIluminacion;
}
export default Sensores  