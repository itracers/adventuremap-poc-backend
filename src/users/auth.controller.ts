import { Controller, Get } from '@nestjs/common';
import { AppService } from '../app.service';

@Controller()
export class AuthController {
  constructor(private readonly appService: AppService) {}
}
