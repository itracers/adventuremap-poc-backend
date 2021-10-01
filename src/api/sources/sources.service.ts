import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Source } from './sources.model';

@Injectable()
export class SourcesService {
  constructor(
    @InjectModel(Source)
    private sourcesModel: typeof Source
  ) { }

  async findAll(): Promise<Source[]> {
    return this.sourcesModel.findAll<Source>();
  }

  async findByPk(id: string | number): Promise<Source> {
    return this.sourcesModel.findByPk<Source>(id);
  }
}
