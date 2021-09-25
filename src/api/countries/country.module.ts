import { Module } from '@nestjs/common';
import { CountriesController } from './country.controller';
import { CountriesService } from './country.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Country } from './country.model';

@Module({
  imports: [SequelizeModule.forFeature([Country])],
  controllers: [CountriesController],
  providers: [
    CountriesService
  ],
})
export class CountriesModule {}
