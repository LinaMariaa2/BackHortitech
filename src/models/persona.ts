import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Zona } from './zona'

@Table({ tableName: 'tbl_persona', timestamps: false })
export class Persona extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id_persona: number;

  @Column({ type: DataType.STRING(50), allowNull: false })
  nombre_usuario: string;

  @Column({ type: DataType.ENUM('administrador','aprendiz') })
  rol: string;

  @ForeignKey(() => Zona)
  @Column({ type: DataType.INTEGER, onDelete: 'CASCADE' })
  id_zona: number;

  @Column({ type: DataType.STRING(100), allowNull: false, unique: true })
  correo: string;

  @Column({ type: DataType.STRING(255), allowNull: true })
  contrasena: string;

  @Column({ type: DataType.STRING(15), allowNull: true })
  telefono: string;

  @Column({ type: DataType.DATE, defaultValue: null } )
  fecha_creacion: Date;

  @Column({ type: DataType.DATE, defaultValue: null})
  fecha_eliminacion: Date;
  @Column({ type: DataType.ENUM('activo', 'inactivo'),allowNull: true})
  estado: string;
  @BelongsTo(() => Zona)
  zona: Zona;
}
export default Persona;
