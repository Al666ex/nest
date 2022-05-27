import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateDtoUser } from './dto/dto.user';
import { User } from './user.model';
import { UsersService } from './users.service';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
    constructor(private userService : UsersService){}

    @ApiOperation({summary : 'Создание пользователя'})
    @ApiResponse({status : 200, type : User})
    @Post()
    async create(@Body() dto : CreateDtoUser){
        const user = await this.userService.create(dto)
        return user
    }

    @ApiOperation({summary : 'Get all users'})
    @ApiResponse({status : 200, type : [User]})
    @Get()
   async get(){
       const user = await this.userService.getAll()       
       return user;
   }

}
