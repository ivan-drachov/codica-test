import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ServicesService } from 'src/services/services.service';
import { CreateUserDto } from './dto/create-user.dto';
import { SignUserDto } from './dto/sign-user.dto';
import { User } from './users.model';

@Injectable()
export class UsersService {

    constructor (@InjectModel(User) private userRepository: typeof User,
        private serviceService: ServicesService){}

    async createUser(dto: CreateUserDto){
        const user = await this.userRepository.create(dto)
        return user;
    }
    async getAllUsers(){
        const users = await this.userRepository.findAll({include:{all:true}})
        return users
    }
    async getUserById(id: number){
        
        const user = await this.userRepository.findOne({where:{id}, include:{all:true}})
        if (user){ return user }

        throw new HttpException('User with such ID not found', HttpStatus.NOT_FOUND)
        
    }
    async getServiceById(id: number){
        const service = await this.serviceService.getServiceById(id)
        if(service){return service}
        throw new HttpException('Service with such ID not found', HttpStatus.NOT_FOUND)
    }

    async signUserToService(dto: SignUserDto){
        const user = await this.getUserById(dto.userId)
        const service = await this.getServiceById(dto.serviceId)
        if (user && service){
            await user.$add('services', [service.id])
            service.popularity = service.popularity + 1
            await service.save() 
            return user
        }
        throw new HttpException('User or Service not found', HttpStatus.NOT_FOUND)
        
    }


}
