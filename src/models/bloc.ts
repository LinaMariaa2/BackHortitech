import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Zona } from './zona';

@Table({ tableName: 'tbl_bloc' })
export class Bloc extends Model { //hereda toda la funcionalidad necesaria para interactuar
    // con la base de datos (operaciones CRUD, gestión de relaciones, etc.).
  @Column({ primaryKey: true, autoIncrement: true })
  id_publicacion: number;

  @Column({ type: DataType.DATE, defaultValue: null })
  fecha_publicacion: Date;

  @Column({ type: DataType.TEXT })
  contenido: string; 

  @Column({ type: DataType.TIME, defaultValue: null })
  hora_publicacion: string; // Usamos string para representar la hora

  @ForeignKey(() => Zona)
  @Column({ type: DataType.INTEGER, onDelete: 'CASCADE' })
  id_zona: number;

  @BelongsTo(() => Zona)
  zona: Zona;
}

export default Bloc;
