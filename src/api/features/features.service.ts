import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize';
import { CountryFeatures } from '../countryFeatures/countryFeatures.model';
import { Feature } from './features.model';

@Injectable()
export class FeaturesService {
  constructor(
    @InjectModel(Feature)
    private featuresModel: typeof Feature
  ) { }

  async findAll(): Promise<Feature[]> {
    return (await this.featuresModel.findAll<Feature>({
      include: {
        attributes: [
          [Sequelize.fn('min', Sequelize.col('value')), 'minValueRaw'],
          [Sequelize.fn('max', Sequelize.col('value')), 'maxValueRaw'],
          [Sequelize.literal('min(cast(`value` as unsigned))'), 'minValueNumeric'],
          [Sequelize.literal('max(cast(`value` as unsigned))'), 'maxValueNumeric']
        ],
        model: CountryFeatures
      },
      group: ['id']
    }))
      .map(feature => {
        //@ts-ignore
        if (feature.dataValues.countryFeatures[0]) {
          //@ts-ignore
          feature.minValue = feature.dataValues.countryFeatures[0].dataValues[feature.type === 'int' ? 'minValueNumeric' : 'minValueRaw'];
          //@ts-ignore
          feature.maxValue = feature.dataValues.countryFeatures[0].dataValues[feature.type === 'int' ? 'maxValueNumeric' : 'maxValueRaw'];
        }
        else {
          feature.minValue = null;
          feature.maxValue = null;
        }
        //@ts-ignore
        delete feature.dataValues.countryFeatures;

        return feature;
      });
  }

  async findByPk(id: string | number): Promise<Feature> {
    return this.featuresModel.findByPk<Feature>(id);
  }
}
