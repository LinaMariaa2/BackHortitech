import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Invernadero } from './invernadero';

@Table({ tableName: 'tbl_zona', timestamps: false })
export class Zona extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
   declare id_zona: number;

  @Column({ type: DataType.STRING(50), allowNull: false })
  declare nombre: string;

  @Column({ type: DataType.TEXT })
  declare descripciones_add: string;

  @Column({ type: DataType.ENUM('goteo', 'aspersión', 'manguera', 'inactivo') })
  declare tipo_riego: string;

  @Column({ type: DataType.ENUM('LED', 'Fluorescentes', 'inactivo') })
  declare tipo_iluminacion: string;

  @Column({ type: DataType.DATE })
  declare fecha_ultima_activacion: Date;

  @ForeignKey(() => Invernadero)
  @Column({ type: DataType.INTEGER })
  declare id_invernadero: number;

  @BelongsTo(() => Invernadero)
  declare invernadero: Invernadero;
}
export default Zona;