import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Country } from '../countries/country.model';
import { CountryPaymentMethods } from '../countryPaymentMethods/countryPaymentMethod.model';
import { ImportPaymentMethodDto } from './dto/import-payment-method';
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

  async importPaymentMethods(paymentMethodsData: Array<ImportPaymentMethodDto>) {
    if (paymentMethodsData.length > 0) {
      const countriesMapped = (await Country.findAll({
        attributes: ['country_code_2', 'id'],
        where: {
          country_code_2: Array.from(new Set(paymentMethodsData.map(item => item.country_code_2)))
        }
      }))
        .reduce((prev, next) => {
          prev[next.country_code_2] = next.id;
          return prev;
        }, {});

      const paymentMethodsMapped = (await PaymentMethod.findAll({
        attributes: ['slug', 'id'],
        where: {
          slug: Array.from(new Set(paymentMethodsData.map(item => item.payment_method_slug)))
        }
      }))
        .reduce((prev, next) => {
          prev[next.slug] = next.id;
          return prev;
        }, {});

      for (let item of paymentMethodsData) {
        const paymentMethodData = {
          country_id: countriesMapped[item.country_code_2],
          payment_method_id: paymentMethodsMapped[item.payment_method_slug]
        };

        const countryPaymentMethod = await CountryPaymentMethods.findOne({ where: paymentMethodData });
        if (!countryPaymentMethod) {
          await CountryPaymentMethods.create({ ...paymentMethodData, currency: item.currency });
        }
        else {
          await countryPaymentMethod.update({ ...paymentMethodData, currency: item.currency });
        }
      }
    }
  }
}
