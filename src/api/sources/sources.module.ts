import { Module } from '@nestjs/common';
import { SourcesController } from './sources.controller';
import { SourcesService } from './sources.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Source } from './sources.model';

@Module({
  imports: [SequelizeModule.forFeature([Source])],
  controllers: [SourcesController],
  providers: [
    SourcesService
  ],
})
export class SourcesModule { }
