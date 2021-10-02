import { Command, Positional } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { FeaturesService } from './features.service';
import { createReadStream } from 'fs';
import * as csv from 'csv-parser';

@Injectable()
export class FeaturesCommand {
  constructor(private readonly featuresService: FeaturesService) { }

  @Command({
    command: 'import:features <filename>',
    describe: 'import features from CSV',
  })
  async create(
    @Positional({
      name: 'filename',
      describe: 'CSV filename',
      type: 'string'
    })
    filename: string,
  ) {
    await new Promise(resolve => {
      let results = [];
      createReadStream(filename)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
          resolve(results);
        });

    }).then((results: []) => this.featuresService.importFeatures(results))

  }
}
