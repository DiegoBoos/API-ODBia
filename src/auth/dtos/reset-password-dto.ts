import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsStrongPassword } from "class-validator";


export class ResetPasswordDto {

    @IsString()
    @ApiProperty({ 
        description: 'Nueva Contraseña'
     })
     @IsStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        minUppercase: 1
      }, {
        message: 'Password must be at least 8 characters long and contain at least one uppercase letter and one number and one symbol character.'
      })
     password: string;

    @IsString()
    @ApiProperty()
    token: string;

}