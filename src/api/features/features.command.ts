import { Command, Positional } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { FeaturesService } from './features.service';
import { createReadStream } from 'fs';
import * as csv from 'csv-parser';

// const SOURCES = {
//   'numbeo:quality-of-life'
// }

@Injectable()
export class FeaturesCommand {
  constructor(private readonly featuresService: FeaturesService) { }

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
  }
}
