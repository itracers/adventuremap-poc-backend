import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PaymentMethod } from './paymentMethod.model';

@Injectable()
export class PaymentMethodsService {
  constructor(
    @InjectModel(PaymentMethod)
    private paymentMethodsModel: typeof PaymentMethod
  ) { }

  async findAll(): Promise<PaymentMethod[]> {
    return this.paymentMethodsModel.findAll<PaymentMethod>();
  }

  async findByPk(id: string | number): Promise<PaymentMethod> {
    return this.paymentMethodsModel.findByPk<PaymentMethod>(id);
  }
}
