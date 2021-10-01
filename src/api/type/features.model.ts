import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'features', underscored: true, createdAt: 'created_at', updatedAt: 'updated_at' })
export class Feature extends Model {
  @Column({ type: DataType.INTEGER, primaryKey: true })
  id: number;

  @Column
  name: string;

  @Column
  property: string;
}
