import { Controller, Get } from '@nestjs/common';
import { AppService } from '../app.service';

@Controller()
export class AlertsController {
  constructor(private readonly appService: AppService) {}
}
