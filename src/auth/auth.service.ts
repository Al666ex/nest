import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import {JwtService} from '@nestjs/jwt'
import {UsersService} from '../users/users.service'
import {CreateDtoUser} from '../users/dto/dto.user'
import {User} from '../users/user.model'
import * as bcript from 'bcryptjs'

@Injectable()
export class AuthService {
    constructor(
        private usersService:UsersService, 
        private jwtService : JwtService
    ){} 

    async login(dto:CreateDtoUser){
        const user = await this.validator(dto)
        return this.generationToken(user)

    }

    async registration(dto:CreateDtoUser){
        const candidate = await this.usersService.getUserByEmail(dto.email)
        if(candidate){
            throw new HttpException(`Email= ${candidate} is already exists`, HttpStatus.BAD_REQUEST)
        }

        const hashPassword = await bcript.hash(dto.password, 5)
        const user = await this.usersService.create({...dto, password : hashPassword})
        return await this.generationToken(user)

    }

    private generationToken( user ){
        const payload = {id : user.id, email : user.email, roles : user.roles}
        return {
            token : this.jwtService.sign(payload)
        }
    }

    private async validator(dto : CreateDtoUser){
        const user =  await this.usersService.getUserByEmail(dto.email)
        const comparePsw = await bcript.compare( dto.password, user.password)
        if(user && comparePsw){
            return user
        }

        throw new UnauthorizedException({message : 'некорректный email или пароль'})
    }
}
