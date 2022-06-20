import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class  DtoAddRole{
    @ApiProperty({example : '123', description : 'Уникальный номер пользователя'})
    @IsNumber({}, {message : 'Числовое значение'})    
    readonly userId : number;

    @ApiProperty({example : 'USER', description : 'Наименование роли'})
    @IsString({message : 'Строковое значение'})
    readonly value : string
}