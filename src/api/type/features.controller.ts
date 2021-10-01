import { Controller, Get, Req } from '@nestjs/common';
import { Feature } from './features.model';
import { FeaturesService } from './features.service';

@Controller('features')
export class FeaturesController {
  constructor(private readonly featuresService: FeaturesService) {}

  @Get()
  findAll(@Req() request): Promise<Feature[]>  {
    return this.featuresService.findAll();
  }

  @Get('/:id')
  findByPk(@Req() request): Promise<Feature>  {
    return this.featuresService.findByPk(request.params.id);
  }

}
