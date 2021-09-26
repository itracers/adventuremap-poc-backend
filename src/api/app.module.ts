import { Module } from '@nestjs/common';
import { CountriesModule } from './countries/country.module';
import { CountryPaymentMethodsModule } from './countryPaymentMethods/countryPaymentMethod.module';
import DBModule from './db.module';
import { PaymentMethodsModule } from './paymentMethods/paymentMethod.module';

@Module({
  imports: [
    DBModule,
    PaymentMethodsModule,
    CountryPaymentMethodsModule,
    CountriesModule
  ]
})
export class AppModule {}