import { Table, Column, Model, DataType, AutoIncrement } from 'sequelize-typescript';

@Table({ tableName: 'paymentMethods', underscored: true, createdAt: 'created_at', updatedAt: 'updated_at' })
export class PaymentMethod extends Model {
  @AutoIncrement
  @Column({ type: DataType.INTEGER, primaryKey: true })
  id: number;

  @Column
  name: string;

  @Column
  slug: string;
}
