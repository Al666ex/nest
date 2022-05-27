import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateDtoUser } from "./dto/dto.user";
import { User } from "./user.model";

@Injectable()
export class UsersService{
    constructor(@InjectModel(User) private userService : typeof User){}

    async create(dto : CreateDtoUser){
        const user = await this.userService.create(dto)
        return user;
    }

    async getAll(){
        const user = await this.userService.findAll()
        return user;
    }
}