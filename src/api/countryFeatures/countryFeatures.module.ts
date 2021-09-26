import { Module } from '@nestjs/common';
import { CountryFeaturesController } from './countryFeatures.controller';
import { CountryFeaturesService } from './countryFeatures.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { CountryFeatures } from './countryFeatures.model';

@Module({
  imports: [SequelizeModule.forFeature([CountryFeatures])],
  controllers: [CountryFeaturesController],
  providers: [
    CountryFeaturesService
  ],
})
export class CountryFeaturesModule { }
