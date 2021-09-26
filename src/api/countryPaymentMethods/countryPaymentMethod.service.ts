import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Country } from '../countries/country.model';
import { PaymentMethod } from '../paymentMethods/paymentMethod.model';
import { CountryPaymentMethods } from './countryPaymentMethod.model';

@Injectable()
export class CountryPaymentMethodsService {
  constructor(
    @InjectModel(CountryPaymentMethods)
    private countryPaymentMethodsModel: typeof CountryPaymentMethods
  ) { }

  async findAll({ query, country_id, payment_method_id, requires_additional_verification }): Promise<CountryPaymentMethods[]> {
    let where: any = {};
    if (query) {
      where.name = {
        [Op.like]: `%${query}%`
      }
    }
    if (country_id) {
      where.country_id = country_id;
    }

    if (payment_method_id) {
      where.payment_method_id = payment_method_id;
    }

    if (requires_additional_verification !== undefined && requires_additional_verification !== null) {
      where.requires_additional_verification = JSON.parse(requires_additional_verification);
    }

    return this.countryPaymentMethodsModel.findAll<CountryPaymentMethods>({
      attributes: ['id', 'requires_additional_verification'],
      where,
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
