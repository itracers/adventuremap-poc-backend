import { Command, Positional } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { FeaturesService } from './features.service';
import { createReadStream } from 'fs';
import * as csv from 'csv-parser';
import { ImportFeatureDto } from './dto/import-feature.dto';
import { CountriesService } from '../countries/country.service';

import NumbeoParser from '../../parsers/numbeo/index';
@Injectable()
export class FeaturesCommand {
  constructor(private readonly featuresService: FeaturesService, private readonly countriesService: CountriesService) { }

  @Command({
    command: 'import:features <filename>',
    describe: 'import features from CSV',
  })
  async import(
    @Positional({
      name: 'filename',
      describe: 'CSV filename',
      type: 'string'
    })
    filename: string,
  ) {
    const results: any[] = await new Promise(resolve => {
      let results = [];
      createReadStream(filename)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => resolve(results));
    });
    await this.featuresService.importFeatures(results);
  }

  @Command({
    command: 'parse:features <source>',
    describe: 'parse features from source'
  })
  async parse(
    @Positional({
      name: 'source',
      describe: 'source name',
      type: 'string'
    })
    source: string,
  ) {
    let features: ImportFeatureDto[] = [];
    switch (source) {
      case 'numbeo':
        features = await this.parseNumbeo();
        break;
    }
    await this.featuresService.importFeatures(features);
  }

  async parseNumbeo(): Promise<ImportFeatureDto[]> {
    let result: ImportFeatureDto[] = [];
    const allCountries = await this.countriesService.findAll();
    const numbeo = new NumbeoParser();
    const data = await numbeo.parseData();
    const featureNamesMapped = await numbeo.getFeatureNamesMapping();
    for (const prefix in data) {
      for (const featuresSet of data[prefix]) {
        const country = allCountries.find(item => item.name == featuresSet.country_name);
        for (let feature_suffix in featuresSet) {
          if (feature_suffix === 'country_name') {
            continue;
          }
          result.push({
            country_code_3: country.country_code_3,
            feature_name: featureNamesMapped[prefix][feature_suffix],
            feature_property: `${prefix}.${feature_suffix}`,
            feature_value: featuresSet[feature_suffix]
          })
        }
      }
    }

    return result;
  }
}
