import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize';
import { Country } from '../countries/country.model';
import { CountryFeatures } from '../countryFeatures/countryFeatures.model';
import { ImportFeatureDto } from './dto/import-feature.dto';
import { Feature } from './features.model';

@Injectable()
export class FeaturesService {
  constructor(
    @InjectModel(Feature)
    private featuresModel: typeof Feature,
    @InjectModel(Country)
    private countryModel: typeof Country,
    @InjectModel(CountryFeatures)
    private countryFeaturesModel: typeof CountryFeatures
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

  async importFeatures(featuresData: Array<ImportFeatureDto>) {
    const featureProperties = Array.from(new Set(featuresData.map(feature => feature.feature_property)));
    let featureNamesMapped = featuresData.reduce((prev, next) => {
      if (!prev[next.feature_property] || next.feature_name) {
        prev[next.feature_property] = next.feature_name;
      }
      return prev;
    }, {});
    let featureIdsMapped = (await this.featuresModel.findAll({ where: { property: featureProperties } }))
      .reduce((prev, next) => {
        prev[next.property] = next.id;
        return prev;
      }, {});

    for (let featureProperty of featureProperties) {
      if (!featureIdsMapped[featureProperty]) {
        const feature = await this.featuresModel.create({ name: featureNamesMapped[featureProperty] || null, property: featureProperty, type: 'string' });
        featureIdsMapped[featureProperty] = feature.id;
      }
    }
    let countryIdsMapped = (await this.countryModel.findAll())
      .reduce((prev, next) => {
        prev[next.country_code_3] = next.id;
        return prev;
      }, {})

    for (let featureItem of featuresData) {
      const countryFeatureData = {
        country_id: countryIdsMapped[featureItem.country_code_3],
        feature_id: featureIdsMapped[featureItem.feature_property],
        value: featureItem.feature_value
      };

      const countryFeature = await this.countryFeaturesModel.findOne({ where: { country_id: countryFeatureData.country_id, feature_id: countryFeatureData.feature_id } });
      if (!countryFeature) {
        await this.countryFeaturesModel.create(countryFeatureData);
      }
      else if (countryFeature.value != countryFeatureData.value) {
        await countryFeature.update({ value: countryFeatureData.value });
      }
    }
  }
}
