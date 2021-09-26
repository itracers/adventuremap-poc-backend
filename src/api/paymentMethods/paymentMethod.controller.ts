import { Controller, Get, Req } from '@nestjs/common';
import { PaymentMethod } from './paymentMethod.model';
import { PaymentMethodsService } from './paymentMethod.service';

@Controller('paymentMethods')
export class PaymentMethodsController {
  constructor(private readonly paymentMethodsService: PaymentMethodsService) {}

  @Get()
  findAll(@Req() request): Promise<PaymentMethod[]>  {
    return this.paymentMethodsService.findAll();
  }

  @Get('/:id')
  findByPk(@Req() request): Promise<PaymentMethod>  {
    return this.paymentMethodsService.findByPk(request.params.id);
  }

}
