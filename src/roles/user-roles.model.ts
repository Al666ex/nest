
import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "src/users/user.model";
import { Role } from "./roles.model";


@Table({tableName : 'user-roles', createdAt : false, updatedAt : false})

export class UserRoles extends Model<Model>{
    @Column({type : DataType.INTEGER, unique : true, autoIncrement : true, primaryKey : true})
    id : number;

    @Column({type : DataType.INTEGER})
    @ForeignKey( () => Role)
    roleId : number;

    @Column({type : DataType.INTEGER})
    @ForeignKey(() => User)
    userId : number 

}