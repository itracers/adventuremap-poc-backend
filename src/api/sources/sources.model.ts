import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'sources', underscored: true, createdAt: 'created_at', updatedAt: 'updated_at' })
export class Source extends Model {
  @Column({ type: DataType.INTEGER, primaryKey: true })
  id: number;

  @Column
  name: string;

  @Column
  slug: string;

  @Column
  url: string;

  @Column
  auto: boolean;
}
