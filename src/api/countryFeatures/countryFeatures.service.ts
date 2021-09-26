import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Country } from '../countries/country.model';
import { Feature } from '../features/features.model';
import { CountryFeatures } from './countryFeatures.model';

@Injectable()
export class CountryFeaturesService {
  constructor(
    @InjectModel(CountryFeatures)
    private countryFeaturesModel: typeof CountryFeatures
  ) { }

  async findAll(): Promise<CountryFeatures[]> {
    return this.countryFeaturesModel.findAll<CountryFeatures>({
      attributes: ['id', 'value'],
      include: [{
        model: Country
      }, {
        model: Feature
      }]
    });
  }

  async findByPk(id: string | number): Promise<CountryFeatures> {
    return this.countryFeaturesModel.findByPk<CountryFeatures>(id);
  }
}
