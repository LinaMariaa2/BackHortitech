import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'tbl_invernadero', timestamps: false})
export class Invernadero extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id_invernadero: number;

  @Column({ type: DataType.STRING(50), allowNull: false }) //allownull-valoresNulos
  nombre: string;

  @Column({ type: DataType.TEXT })
  descripcion: string;

  @Column({ type: DataType.DATE })
  fecha_creacion: Date;

  @Column({ type: DataType.ENUM('activo', 'inactivo'), defaultValue: 'activo' })
  estado: string;

  @Column({ type: DataType.STRING(100) })
  responsable: string;
}

export default Invernadero;