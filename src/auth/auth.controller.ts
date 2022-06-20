import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateDtoUser } from 'src/users/dto/dto.user';
import { User } from 'src/users/user.model';
import { AuthService } from './auth.service';


@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @ApiOperation({summary : 'Авторизация'})
    @ApiResponse({status : 200, type : [User]})
    @Post('/login')
    async login(@Body() dto : CreateDtoUser){
        return await this.authService.login(dto)
    }

    @ApiOperation({summary : 'Регистрация'})
    @ApiResponse({status : 200, type : [User]})
    @Post('/registration')
    async registration(@Body() dto : CreateDtoUser) {
        return await this.authService.registration(dto)        
    }
    
}
