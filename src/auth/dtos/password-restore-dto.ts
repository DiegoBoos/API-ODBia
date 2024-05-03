import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";


export class PasswordRestoreDto {

    @ApiProperty()
    @IsString()
    @IsEmail()
    email: string;

}