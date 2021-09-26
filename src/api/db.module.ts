import { ConfigModule, ConfigService } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { Country } from "./countries/country.model";
import { CountryPaymentMethods } from "./countryPaymentMethods/countryPaymentMethod.model";
import { PaymentMethod } from "./paymentMethods/paymentMethod.model";

const DBModule = SequelizeModule.forRootAsync({
  imports: [ConfigModule.forRoot()],
  useFactory: (configService: ConfigService) => ({
    dialect: 'mysql',
    host: configService.get('DB_HOST'),
    port: +configService.get('DB_PORT'),
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_NAME'),
    models: [Country, PaymentMethod, CountryPaymentMethods],
  }),
  inject: [ConfigService],
});

export default DBModule;