import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Feature } from './features.model';

@Injectable()
export class FeaturesService {
  constructor(
    @InjectModel(Feature)
    private featuresModel: typeof Feature
  ) { }

  async findAll(): Promise<Feature[]> {
    return this.featuresModel.findAll<Feature>();
  }

  async findByPk(id: string | number): Promise<Feature> {
    return this.featuresModel.findByPk<Feature>(id);
  }
}
