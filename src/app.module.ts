import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';

import DBModule from './api/db.module';

import { CountriesModule } from './api/countries/country.module';
import { CountryFeaturesModule } from './api/countryFeatures/countryFeatures.module';
import { CountryPaymentMethodsModule } from './api/countryPaymentMethods/countryPaymentMethod.module';
import { FeaturesModule } from './api/features/features.module';
import { PaymentMethodsModule } from './api/paymentMethods/paymentMethod.module';
import { SourcesModule } from './api/sources/sources.module';

@Module({
  imports: [
    DBModule,
    CommandModule,
    CountryFeaturesModule,
    FeaturesModule,
    PaymentMethodsModule,
    CountryPaymentMethodsModule,
    CountriesModule,
    SourcesModule
  ]
})
export class AppModule {}