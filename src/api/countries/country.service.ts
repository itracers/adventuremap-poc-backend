import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Country } from './country.model';

@Injectable()
export class CountriesService {
  constructor(
    @InjectModel(Country)
    private countriesModel: typeof Country
  ) { }

  async findAll(): Promise<Country[]> {
    return this.countriesModel.findAll<Country>();
  }

  async findByPk(id: string | number): Promise<Country> {
    return this.countriesModel.findByPk<Country>(id);
  }
}
