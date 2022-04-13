import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { Service } from "src/services/services.model";
import { UserServices } from "src/services/user-services.model";

interface UserCreationAttrs {
    email: string;
    name: string
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttrs>{
    @ApiProperty({example: 1, description: 'Unique identifier'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'test@mail.ru', description: 'User e-mail'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;

    @ApiProperty({example: 'John Dow', description: 'User name'})
    @Column({type: DataType.STRING, allowNull: false})
    name: string;

    @BelongsToMany(() => Service, () => UserServices)
    services: Service[];
}