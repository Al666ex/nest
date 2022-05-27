import { ApiProperty } from "@nestjs/swagger";

export class CreateDtoUser{
    @ApiProperty({example : 'user@mail.ru', description : 'email пользователя'})
    readonly email : string;
    @ApiProperty({example : 'password', description : 'пароль пользователя'})
    readonly password : string
}