import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { Role } from "src/roles/roles.model";
import { UserRoles } from "src/roles/user-roles.model";

interface UcerAtrrCreate{
    email :string,
    password : string
}

@Table({tableName : 'users'})
export class User extends Model<User,UcerAtrrCreate>{
    @ApiProperty({example : 1, description : 'Уникальный идентификатор'})
    @Column({type : DataType.INTEGER, unique:true, autoIncrement:true, primaryKey:true})
    id:number;

    @ApiProperty({example : 'user@mail.ru', description : 'Почтовый адрес'})
    @Column({type : DataType.STRING, unique:true, allowNull : false})
    email:string;

    @ApiProperty({example : 'password', description : 'Пароль пользователя'})
    @Column({type : DataType.STRING, allowNull : false})
    password:string;

    @ApiProperty({example : 'true/false', description : 'Пользователь заблокирован yes/no'})
    @Column({type : DataType.BOOLEAN, defaultValue : false})
    banned: boolean;

    @ApiProperty({example : 'Dos attac', description : 'DOS атака на сайт'})
    @Column({type : DataType.STRING, allowNull : true})
    bannReason:string

    @BelongsToMany(() => Role, () => UserRoles)
    roles : Role[]
}