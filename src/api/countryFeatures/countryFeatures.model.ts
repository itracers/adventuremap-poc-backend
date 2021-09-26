import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Country } from '../countries/country.model';
import { Feature } from '../features/features.model';

@Table({ tableName: 'countryFeatures', underscored: true, createdAt: 'created_at', updatedAt: 'updated_at' })
export class CountryFeatures extends Model {
  @Column({ type: DataType.INTEGER, primaryKey: true })
  id: number;

  @Column
  @ForeignKey(() => Country)
  country_id: number;

  @BelongsTo(() => Country)
  country: Country;

  @Column
  @ForeignKey(() => Feature)
  feature_id: number;

  @BelongsTo(() => Feature)
  feature: Feature;

  @Column
  value: string;
}
