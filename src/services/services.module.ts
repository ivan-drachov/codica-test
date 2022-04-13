import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';
import { ServicesController } from './services.controller';
import { Service } from './services.model';
import { ServicesService } from './services.service';
import { UserServices } from './user-services.model';

@Module({
  controllers: [ServicesController],
  providers: [ServicesService],
  imports: [
    SequelizeModule.forFeature([Service, User, UserServices])
  ],
  exports: [ServicesService]
})
export class ServicesModule {}
