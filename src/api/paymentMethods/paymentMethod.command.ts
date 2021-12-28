import { Injectable } from '@nestjs/common';
import { ImportPaymentMethodDto } from './dto/import-payment-method';
import { CountriesService } from '../countries/country.service';

import ECBParser from '../../parsers/ecb/index';
import { PaymentMethodsService } from './paymentMethod.service';
import { Command, Positional } from 'nestjs-command';
@Injectable()
export class PaymentMethodsCommand {
  constructor(private readonly paymentMethodsService: PaymentMethodsService, private readonly countriesService: CountriesService) { }

  @Command({
    command: 'parse:paymentMethods <source>',
    describe: 'parse paymentMethods from source'
  })
  async parse(
    @Positional({
      name: 'source',
      describe: 'source name',
      type: 'string'
    })
    source: string,
  ) {
    switch (source) {
      case 'ecb':
        await this.parseEcb();
        break;
      default:
        throw new Error(`Source ${source} not supported`);
    }

  }
  async parseEcb(): Promise<ImportPaymentMethodDto[]> {
    let result: ImportPaymentMethodDto[] = [];
    const ecb = new ECBParser();
    const data = await ecb.parseData();
    for (const paymentMethodData of data) {
      result.push({
        country_code_2: paymentMethodData.countryCode2,
        payment_method_slug: 'sepa',
        currency: paymentMethodData.usingEuro ? 'eur' : null
      })
    }
    await this.paymentMethodsService.importPaymentMethods(result);

    return result;
  }
}
