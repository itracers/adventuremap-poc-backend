import { Controller, Get, Req } from '@nestjs/common';
import { CountryPaymentMethods } from './countryPaymentMethod.model';
import { CountryPaymentMethodsService } from './countryPaymentMethod.service';

@Controller('countries/paymentMethods')
export class CountryPaymentMethodsController {
  constructor(private readonly countryPaymentMethodsService: CountryPaymentMethodsService) {}

  @Get()
  findAll(@Req() request): Promise<CountryPaymentMethods[]>  {
    return this.countryPaymentMethodsService.findAll(request.query);
  }

  @Get('/:id')
  findByPk(@Req() request): Promise<CountryPaymentMethods>  {
    return this.countryPaymentMethodsService.findByPk(request.params.id);
  }

}
