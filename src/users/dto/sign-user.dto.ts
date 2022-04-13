import { ApiProperty } from "@nestjs/swagger";

export class SignUserDto{
    @ApiProperty({example: 2, description: 'User ID'})
    readonly userId: number;
    @ApiProperty({example: 3, description: 'Service ID '})
    readonly serviceId: number;
}