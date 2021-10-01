import { Controller, Get, Req } from '@nestjs/common';
import { Source } from './sources.model';
import { SourcesService } from './sources.service';

@Controller('sources')
export class SourcesController {
  constructor(private readonly sourcesService: SourcesService) {}

  @Get()
  findAll(@Req() request): Promise<Source[]>  {
    return this.sourcesService.findAll();
  }

  @Get('/:id')
  findByPk(@Req() request): Promise<Source>  {
    return this.sourcesService.findByPk(request.params.id);
  }

}
