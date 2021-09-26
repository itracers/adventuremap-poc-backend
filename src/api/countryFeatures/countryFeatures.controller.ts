import { Controller, Get, Req } from '@nestjs/common';
import { CountryFeatures } from './countryFeatures.model';
import { CountryFeaturesService } from './countryFeatures.service';

@Controller('countries/features')
export class CountryFeaturesController {
  constructor(private readonly countryFeaturesService: CountryFeaturesService) {}

  @Get()
  findAll(@Req() request): Promise<CountryFeatures[]>  {
    return this.countryFeaturesService.findAll(request.query);
  }

  @Get('/:id')
  findByPk(@Req() request): Promise<CountryFeatures>  {
    return this.countryFeaturesService.findByPk(request.params.id);
  }

}
