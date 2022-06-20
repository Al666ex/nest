import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateDtoRole } from './dto/dto.role';
import { RolesService } from './roles.service';

@ApiTags('Роли')
@Controller('roles')
export class RolesController {
    constructor(private rolesServices : RolesService){}

    @Post()
    async create(@Body() dto : CreateDtoRole){
        const role = await this.rolesServices.createRole(dto)
        return role
    }

    @Get('/:value')
    async getRole(@Param('value') value : string){
        const roles = await this.rolesServices.getRole(value)
        return roles
    }
}
