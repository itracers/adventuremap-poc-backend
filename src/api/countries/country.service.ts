import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Country } from './country.model';

@Injectable()
export class CountriesService {
  constructor(
    @InjectModel(Country)
    private countriesModel: typeof Country
  ) { }

  async findAll({ query }: { query: string } = { query: null }): Promise<Country[]> {
    let where: any = {};
    if (query) {
      where.name = { [Op.like]: `%${query}%` };
    }
    return this.countriesModel.findAll<Country>({ where });
  }

  async findByPk(id: string | number): Promise<Country> {
    return this.countriesModel.findByPk<Country>(id);
  }
}
