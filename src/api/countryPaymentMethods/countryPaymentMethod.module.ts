import { Module } from '@nestjs/common';
import { CountryPaymentMethodsController } from './countryPaymentMethod.controller';
import { CountryPaymentMethodsService } from './countryPaymentMethod.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { CountryPaymentMethods } from './countryPaymentMethod.model';

@Module({
  imports: [SequelizeModule.forFeature([CountryPaymentMethods])],
  controllers: [CountryPaymentMethodsController],
  providers: [
    CountryPaymentMethodsService
  ],
})
export class CountryPaymentMethodsModule {}
