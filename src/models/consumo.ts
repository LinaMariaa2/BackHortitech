import {Table,Column,Model,DataType,ForeignKey,BelongsTo,} from 'sequelize-typescript';
  import { HistorialRiego } from './historialRiego';
  import { HistorialIluminacion } from './historialIluminacion';
  
  @Table({ tableName: 'tbl_consumo' })
  export class Consumo extends Model {
    @Column({ primaryKey: true, autoIncrement: true })
    id_consumo: number;
  
    @Column({ type: DataType.DATEONLY, allowNull: false })
    fecha: Date;
  
    @Column({ type: DataType.DECIMAL(10, 2), defaultValue: 0 })
    consumo_agua: number;
  
    @Column({ type: DataType.DECIMAL(10, 2), defaultValue: 0 })
    consumo_energia: number;

    @ForeignKey(() => HistorialRiego)
    @Column({ type: DataType.INTEGER, allowNull: true, onDelete: 'SET NULL' })
    id_historial_riego: number;
  
    @ForeignKey(() => HistorialIluminacion)
    @Column({ type: DataType.INTEGER, allowNull: true, onDelete: 'SET NULL' })
    id_historial_iluminacion: number;
  
    @BelongsTo(() => HistorialRiego)
    historialRiego: HistorialRiego;
  
    @BelongsTo(() => HistorialIluminacion)
    historialIluminacion: HistorialIluminacion;
  }

export default Consumo;
  