import { Body, Controller, Get, NotFoundException, Param, Post, UseFilters } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateServiceDto } from './dto/create-service.dto';
import { Service } from './services.model';
import { ServicesService } from './services.service';

@ApiTags('Services')
@Controller('services')
export class ServicesController {

    constructor(private serviceService: ServicesService){}

    @ApiOperation({summary: 'New service creation'})
    @ApiResponse({status: 201, type: Service})
    @Post()
    create(@Body() dto: CreateServiceDto){
        return this.serviceService.createService(dto)
    }

    @ApiOperation({summary: 'Get all existed services'})
    @ApiResponse({status: 200, type: Service})
    @Get()
    getAll(){
        return this.serviceService.getAllServices();
    }

    @ApiOperation({summary: 'Get service by ID'})
    @ApiResponse({status: 200, type: Service})
    @Get('/:id')
    getById(@Param('id')id: number){
        const service = this.serviceService.getServiceById(id);
        return service
    }

    @ApiOperation({summary: 'List of user services'})
    @ApiResponse({status: 200, type: [Service]})
    @Get('/user/:id')
    getServicesOfUser(@Param('id')id: number){
        const list = this.serviceService.getServicesListOfUser(id)
        return list
    }

    @ApiOperation({summary: 'List of popular services by string'})
    @ApiResponse({status: 200, type: [Service]})
    @Get('/search/:value')
    getPopServicesByString(@Param('value')value: string){
        const list = this.serviceService.getPopServicesByTitle(value)
        return list
    }


}
