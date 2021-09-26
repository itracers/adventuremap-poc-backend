import { Module } from '@nestjs/common';
import { PaymentMethodsController } from './paymentMethod.controller';
import { PaymentMethodsService } from './paymentMethod.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { PaymentMethod } from './paymentMethod.model';

@Module({
  imports: [SequelizeModule.forFeature([PaymentMethod])],
  controllers: [PaymentMethodsController],
  providers: [
    PaymentMethodsService
  ],
})
export class PaymentMethodsModule { }
