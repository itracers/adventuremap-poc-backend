import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Country } from '../countries/country.model';
import { Feature } from '../features/features.model';
import { CountryFeatures } from './countryFeatures.model';

const FEATURE_VALUE_OPERATORS = { '>': Op.gt, '<': Op.lt, '=': Op.eq, 'like': Op.like };
@Injectable()
export class CountryFeaturesService {
  constructor(
    @InjectModel(CountryFeatures)
    private countryFeaturesModel: typeof CountryFeatures
  ) { }

  async findAll({ query, country_id, feature_id, value, value_operator }): Promise<CountryFeatures[]> {
    let where: any = {};
    if (query) {
      where.name = {
        [Op.like]: `%${query}%`
      }
    }
    if (country_id) {
      where.country_id = country_id;
    }

    if (feature_id) {
      where.feature_id = feature_id;
    }

    if (value) {
      value_operator = value_operator || '=';
      if (!FEATURE_VALUE_OPERATORS) {
        throw new BadRequestException(`Operator not supported, should be one of ${Object.keys(FEATURE_VALUE_OPERATORS).join('. ')}`);
      }
      where.value = {
        [FEATURE_VALUE_OPERATORS[value_operator]]: value
      }
    }

    return this.countryFeaturesModel.findAll<CountryFeatures>({
      attributes: ['id', 'value'],
      where,
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
