import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto{
    @ApiProperty({example: 'test@mail.ru', description: 'User e-mail'})
    readonly email: string;
    @ApiProperty({example: 'John Dow', description: 'User name'})
    readonly name: string;
}