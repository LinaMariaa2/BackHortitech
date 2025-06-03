import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Zona } from './zona';

@Table({ tableName: 'tbl_bloc', timestamps: true })

export class Bloc extends Model { 

  @Column({ primaryKey: true, autoIncrement: true })
  id_publicacion: number;

  @Column({ type: DataType.TEXT })
  contenido: string; 

  @Column({ type: DataType.TIME, defaultValue: null })
  hora_publicacion: string; 

  @ForeignKey(() => Zona)
  @Column({ type: DataType.INTEGER, onDelete: 'CASCADE' })
  id_zona: number;

  @BelongsTo(() => Zona)
  zona: Zona;

// declare createdAt: Date; Si ya estan declaadad
// declare updatedAt: Date;
}

export default Bloc;
