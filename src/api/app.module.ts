import { Module } from '@nestjs/common';
import { CountriesModule } from './countries/country.module';
import { CountryFeaturesModule } from './countryFeatures/countryFeatures.module';
import { CountryPaymentMethodsModule } from './countryPaymentMethods/countryPaymentMethod.module';
import DBModule from './db.module';
import { FeaturesModule } from './features/features.module';
import { PaymentMethodsModule } from './paymentMethods/paymentMethod.module';

@Module({
  imports: [
    DBModule,
    CountryFeaturesModule,
    FeaturesModule,
    PaymentMethodsModule,
    CountryPaymentMethodsModule,
    CountriesModule
  ]
})
export class AppModule {}