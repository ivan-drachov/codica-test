import { HttpException, HttpStatus, Injectable, UseFilters } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';
import { UsersService } from 'src/users/users.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { Service } from './services.model';
import { UserServices } from './user-services.model';
import sequelize from 'sequelize';

@Injectable()
export class ServicesService {

    constructor(@InjectModel(Service) private serviceRepository: typeof Service, 
    @InjectModel(UserServices) private userServiceRepository,
    @InjectModel(User) private userRepository: typeof User){}

    async createService(dto: CreateServiceDto){
        const service = await this.serviceRepository.create(dto)
        service.popularity = 0
        await service.save()
        return service;
    }

    async getAllServices(){
        
        const services = await this.serviceRepository.findAll()
        return services
        
    }
    async getServiceById(id: number){
        
        const service = await this.serviceRepository.findOne({where:{id}})
        if(service) { return service}
        throw new HttpException('Service with such ID not found', HttpStatus.NOT_FOUND)
    }
    async getServicesListOfUser(id: number){
        const servicesArray = []
        const user = await this.userRepository.findByPk(id)
        if (user){
            const list = await this.userServiceRepository.findAll({where:{userId: id}})
                list.forEach(element => {
                servicesArray.push(element["serviceId"])
            });
            const serviceList = await this.serviceRepository.findAll({where: {id: servicesArray}})
            return serviceList
        }
        throw new HttpException('User with such ID not found', HttpStatus.NOT_FOUND)
    }
    async getPopServicesByTitle(val: string){
        return await this.serviceRepository.findAll({
            where: {title: {[sequelize.Op.iLike]:`%${val}%`}},
            order: [['popularity', 'DESC']]
            
           });
    }

}
