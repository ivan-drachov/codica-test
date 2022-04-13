import { ApiProperty } from "@nestjs/swagger";

export class CreateServiceDto{
    @ApiProperty({example: 'Some new service', description: 'Title of new service'})
    readonly title: string;
    @ApiProperty({example: 'What is the new service for', description: 'Some description'})
    readonly description: string;
}