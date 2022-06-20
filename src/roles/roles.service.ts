import { Body, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateDtoRole } from './dto/dto.role';
import { Role } from './roles.model';

@Injectable()
export class RolesService {
    constructor(@InjectModel(Role) private rolesServices : typeof Role){}

    async createRole(dto : CreateDtoRole) {
        const role = this.rolesServices.create(dto)    
        return role    
    }

    async getRole(value :string){
        const role = this.rolesServices.findOne({where : {value}})
        return role
    }
}
