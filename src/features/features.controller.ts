import { Controller, Get } from '@nestjs/common';
import { AppService } from '../app.service';

@Controller()
export class FeaturesController {
  constructor(private readonly appService: AppService) {}
}
