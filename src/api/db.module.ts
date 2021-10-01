import { ConfigModule, ConfigService } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { Country } from "./countries/country.model";
import { CountryFeatures } from "./countryFeatures/countryFeatures.model";
import { CountryPaymentMethods } from "./countryPaymentMethods/countryPaymentMethod.model";
import { Feature } from "./features/features.model";
import { PaymentMethod } from "./paymentMethods/paymentMethod.model";
import { Source } from "./sources/sources.model";

const DBModule = SequelizeModule.forRootAsync({
  imports: [ConfigModule.forRoot()],
  useFactory: (configService: ConfigService) => ({
    dialect: 'mysql',
    host: configService.get('DB_HOST'),
    port: +configService.get('DB_PORT'),
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_NAME'),
    models: [Country, PaymentMethod, CountryPaymentMethods, Feature, CountryFeatures, Source],
  }),
  inject: [ConfigService],
});

export default DBModule;