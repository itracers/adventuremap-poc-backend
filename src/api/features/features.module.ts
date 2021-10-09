import { Module } from '@nestjs/common';
import { FeaturesController } from './features.controller';
import { FeaturesService } from './features.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Feature } from './features.model';
import { FeaturesCommand } from './features.command';
import { Country } from '../countries/country.model';
import { CountryFeatures } from '../countryFeatures/countryFeatures.model';
import { CountriesService } from '../countries/country.service';

@Module({
  imports: [SequelizeModule.forFeature([Feature, Country, CountryFeatures])],
  controllers: [FeaturesController],
  providers: [
    FeaturesService, CountriesService,
    FeaturesCommand
  ],
})
export class FeaturesModule { }
