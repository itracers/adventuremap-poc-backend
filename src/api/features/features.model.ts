import { DataTypes } from 'sequelize';
import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { CountryFeatures } from '../countryFeatures/countryFeatures.model';

@Table({ tableName: 'features', underscored: true, createdAt: 'created_at', updatedAt: 'updated_at' })
export class Feature extends Model {
  @Column({ type: DataType.INTEGER, primaryKey: true })
  id: number;

  @Column
  name: string;

  @Column
  property: string;

  @Column
  type: string;

  @HasMany(() => CountryFeatures)
  countryFeatures: Array<CountryFeatures>

  @Column(DataTypes.VIRTUAL)
  minValue: string;
  @Column(DataTypes.VIRTUAL)
  maxValue: string;
}
