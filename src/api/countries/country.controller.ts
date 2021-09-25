import { Controller, Get, Req } from '@nestjs/common';
import { Country } from './country.model';
import { CountriesService } from './country.service';

@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Get()
  findAll(@Req() request): Promise<Country[]>  {
    return this.countriesService.findAll();
  }

  @Get('/:id')
  findByPk(@Req() request): Promise<Country>  {
    return this.countriesService.findByPk(request.params.id);
  }

}
