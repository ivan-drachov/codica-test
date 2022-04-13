import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./users/users.model";
import { UsersModule } from './users/users.module';
import { ServicesModule } from './services/services.module';
import { Service } from "./services/services.model";
import { UserServices } from "./services/user-services.model";

@Module({
    controllers: [],
    providers: [],
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env'
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRESS_PORT),
            username: process.env.POSTGRES_USER,//'postgres',
            password: process.env.POSTGRESS_PASSWORD,//'root',
            database: process.env.POSTGRES_DB,//'codica-test',
            models: [User, Service, UserServices],
            autoLoadModels: true
        }),
        UsersModule,
        ServicesModule
    ]
})
export class AppModule {}