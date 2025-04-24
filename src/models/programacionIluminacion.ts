import {Table,Column,Model,DataType,ForeignKey,BelongsTo,} from 'sequelize-typescript';
  import { Zona } from './zona';
  
  @Table({ tableName: 'tbl_programacion_iluminacion', timestamps: false })
  export class ProgramacionIluminacion extends Model {
    @Column({ primaryKey: true, autoIncrement: true })
    id_iluminacion: number;
  
    @Column({ type: DataType.TIME, allowNull: true, defaultValue: null })
    hora_activacion: string;
  
    @Column({ type: DataType.TIME, allowNull: true, defaultValue: null })
    hora_desactivacion: string;
  
    @Column({ type: DataType.DATE, allowNull: true, defaultValue: null })
    fecha_inicio: Date;
  
    @Column({ type: DataType.DATE, allowNull: true, defaultValue: null })
    fecha_finalizacion: Date;
  
    @Column({ type: DataType.TEXT, allowNull: true })
    descripcion: string;
  
    @ForeignKey(() => Zona)
    @Column({ type: DataType.INTEGER, allowNull: true, onDelete: 'CASCADE' })
    id_zona: number;
  
    @BelongsTo(() => Zona)
    zona: Zona;
}

export default ProgramacionIluminacion;