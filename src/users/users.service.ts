import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { RolesService } from "src/roles/roles.service";
import { DtoBunUser } from "./dto/dto.bunUser";
import { CreateDtoUser } from "./dto/dto.user";
import { DtoAddRole } from "./dto/dtoAddRole";
import { User } from "./user.model";

@Injectable()
export class UsersService{

    constructor(@InjectModel(User) private userService : typeof User,
                                   private roleService : RolesService){}

    async create(dto : CreateDtoUser){
        const user = await this.userService.create(dto)
        const role = await this.roleService.getRole('USER')
        await user.$set('roles', [role.id])        
        user.roles = [role]
        return user;
    }

    async getAll(){
        const user = await this.userService.findAll({include : {all : true}})
        return user;
    }

    async getUserByEmail(email:string){
        const user = this.userService.findOne({where : {email}, include : {all : true}})
        return user;
    }

    async addRole(dtoAddRole : DtoAddRole){
        const user = await this.userService.findByPk(dtoAddRole.userId)
        const role = await this.roleService.getRole(dtoAddRole.value)
        if(user && role){
            await user.$add('role', role.id)
            return dtoAddRole
        }
        throw new HttpException('Пользователь или роль не найдены', HttpStatus.NOT_FOUND)
    }

    async bun(dto: DtoBunUser) {
        const user = await this.userService.findByPk(dto.userId)
        if(!user){
            throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND)
        }
        user.banned = true
        user.bannReason = dto.bannReason;
        await user.save()
        return dto;
    }
}