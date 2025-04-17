import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Invernadero } from './invernadero';

@Table({ tableName: 'tbl_zona' })
export class Zona extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id_zona: number;

  @Column({ type: DataType.STRING(50), allowNull: false })
  nombre: string;

  @Column({ type: DataType.TEXT })
  descripciones_add: string;

  @Column({ type: DataType.ENUM('goteo', 'aspersión', 'manguera', 'inactivo') })
  tipo_riego: string;

  @Column({ type: DataType.ENUM('LED', 'Fluorescentes', 'inactivo') })
  tipo_iluminacion: string;

  @Column({ type: DataType.DATE })
  fecha_ultima_activacion: Date;

  @ForeignKey(() => Invernadero)
  @Column({ type: DataType.INTEGER })
  id_invernadero: number;

  @BelongsTo(() => Invernadero)
  invernadero: Invernadero;
}
export default Zona;