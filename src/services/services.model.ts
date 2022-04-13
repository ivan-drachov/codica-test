import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { User } from "src/users/users.model";
import { UserServices } from "./user-services.model";

interface ServiceCreationAttrs {
    title: string;
    description: string;
    popularity: number
}

@Table({tableName: 'services'})
export class Service extends Model<Service, ServiceCreationAttrs>{
    @ApiProperty({example: 1, description: 'Unique identifier'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'Food delivery', description: 'Title of service'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    title: string;

    @ApiProperty({example: 'Service of any food delivery', description: 'Description of service'})
    @Column({type: DataType.STRING, allowNull: false})
    description: string;

    @ApiProperty({example: 'Service of any food delivery', description: 'Description of service'})
    @Column({type: DataType.INTEGER, allowNull: false, defaultValue: 0})
    popularity: number;

    @BelongsToMany(() => User, () => UserServices)
    users: User[];
}