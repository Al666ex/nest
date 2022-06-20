import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";


export class CreateDtoUser{
    @ApiProperty({example : 'user@mail.ru', description : 'email пользователя'})
    @IsString({message : 'Должно быть строкой'})    
    @IsEmail({}, {message : 'Неверный email'})    
    readonly email : string;
    @ApiProperty({example : 'password', description : 'пароль пользователя'})
    @IsString({message : 'Должно быть строкой'})    
    @Length(4,12,{message : 'Не меньше 4 не больше 12'})
    readonly password : string
}