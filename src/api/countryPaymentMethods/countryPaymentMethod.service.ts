import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Country } from '../countries/country.model';
import { PaymentMethod } from '../paymentMethods/paymentMethod.model';
import { CountryPaymentMethods } from './countryPaymentMethod.model';

@Injectable()
export class CountryPaymentMethodsService {
  constructor(
    @InjectModel(CountryPaymentMethods)
    private countryPaymentMethodsModel: typeof CountryPaymentMethods
  ) { }

  async findAll(): Promise<CountryPaymentMethods[]> {
    return this.countryPaymentMethodsModel.findAll<CountryPaymentMethods>({
      attributes: ['id', 'requires_additional_verification'],
      include: [{
        model: Country
      }, {
        model: PaymentMethod
      }]
    });
  }

  async findByPk(id: string | number): Promise<CountryPaymentMethods> {
    return this.countryPaymentMethodsModel.findByPk<CountryPaymentMethods>(id);
  }
}
