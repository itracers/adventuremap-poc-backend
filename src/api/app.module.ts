import { Module } from '@nestjs/common';
import { CountriesModule } from './countries/country.module';
import DBModule from './db.module';

@Module({
  imports: [
    DBModule,
    CountriesModule
  ]
})
export class AppModule {}