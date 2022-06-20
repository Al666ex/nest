import { Body, Controller, Get, Post, UseGuards, UsePipes } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { DtoBunUser } from './dto/dto.bunUser';
import { CreateDtoUser } from './dto/dto.user';
import { DtoAddRole } from './dto/dtoAddRole';
import { User } from './user.model';
import { UsersService } from './users.service';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
    constructor(private userService : UsersService){}

    @ApiOperation({summary : 'Создание пользователя'})
    @ApiResponse({status : 200, type : User})
    @UsePipes(ValidationPipe)
    @Post()
    async create(@Body() dto : CreateDtoUser){
        const user = await this.userService.create(dto)
        return user
    }

    @ApiOperation({summary : 'Get all users'})
    @ApiResponse({status : 200, type : [User]})    
    @Roles('ADMIN')    
    @UseGuards(RolesGuard)
    @Get()
    async getAll(){
        const user = await this.userService.getAll()       
        return user;
    }

    @ApiOperation({summary : 'Add role'})
    @ApiResponse({status : 200})
    @Roles('ADMIN')
    @UseGuards(AuthGuard)
    @UsePipes(ValidationPipe)
    @Post( '/role')
    async addRole(@Body() dtoAddRole : DtoAddRole){
        const user = await this.userService.addRole(dtoAddRole)  
        return user;
    }

    @ApiOperation({summary : 'Bun user'})
    @ApiResponse({status : 200})
    @Roles('ADMIN')
    @UseGuards(AuthGuard)
    @Post('/bun')
    async bun(@Body() dto : DtoBunUser){
        return await this.userService.bun(dto)
    }

}
