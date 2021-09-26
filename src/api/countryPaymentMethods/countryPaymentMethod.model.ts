import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Country } from '../countries/country.model';
import { PaymentMethod } from '../paymentMethods/paymentMethod.model';

@Table({ tableName: 'countryPaymentMethods', underscored: true, createdAt: 'created_at', updatedAt: 'updated_at' })
export class CountryPaymentMethods extends Model {
  @Column({ type: DataType.INTEGER, primaryKey: true })
  id: number;

  @Column
  @ForeignKey(() => Country)
  country_id: number;

  @BelongsTo(() => Country)
  country: Country;

  @Column
  @ForeignKey(() => PaymentMethod)
  payment_method_id: number;

  @BelongsTo(() => PaymentMethod)
  paymentMethod: PaymentMethod;

  @Column
  requires_additional_verification: boolean;
}
