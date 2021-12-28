import { Module } from '@nestjs/common';
import { PaymentMethodsController } from './paymentMethod.controller';
import { PaymentMethodsService } from './paymentMethod.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { PaymentMethod } from './paymentMethod.model';
import { CountriesService } from '../countries/country.service';
import { PaymentMethodsCommand } from './paymentMethod.command';
import { Country } from '../countries/country.model';
import { CountryPaymentMethods } from '../countryPaymentMethods/countryPaymentMethod.model';

@Module({
  imports: [SequelizeModule.forFeature([PaymentMethod, Country, CountryPaymentMethods])],
  controllers: [PaymentMethodsController],
  providers: [
    PaymentMethodsService, CountriesService,
    PaymentMethodsCommand
  ],
})
export class PaymentMethodsModule { }
