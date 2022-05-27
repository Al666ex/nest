import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { User } from "src/users/user.model";
import { UserRoles } from "./user-roles.model";

// interface RoleAtrrCreate{
//     email :string,
//     password : string
// }

@Table({tableName : 'roles'})
export class Role extends Model<Role>{
    @ApiProperty({example : 1, description : 'Уникальный идентификатор'})
    @Column({type : DataType.INTEGER, unique:true, autoIncrement:true, primaryKey:true})
    id:number;

    @ApiProperty({example : 'ADMIN', description : 'Уникальное значение роли'})
    @Column({type : DataType.STRING, unique:true, allowNull : false})
    value:string;

    @ApiProperty({example : 'Администратор', description : 'Опимание роли'})
    @Column({type : DataType.STRING, allowNull : false})
    description:string;

    @BelongsToMany( () => User, () => UserRoles)
    users : User[];


}