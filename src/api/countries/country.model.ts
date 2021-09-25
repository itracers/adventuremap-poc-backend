import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'countries', underscored: true, createdAt: 'created_at', updatedAt: 'updated_at' })
export class Country extends Model {
  @Column({ type: DataType.INTEGER, primaryKey: true })
  id: number;

  @Column
  country_code_2: string;

  @Column
  country_code_3: string;

  @Column
  name: string;
}
