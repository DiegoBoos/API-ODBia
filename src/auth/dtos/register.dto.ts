import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsStrongPassword } from 'class-validator';

export class RegisterDto {
  @ApiProperty()
  @IsOptional()
  fullName?: string;

  // @ApiProperty()
  // @IsNotEmpty()
  // @IsDate()
  // birthday: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1
  }, {
    message: 'Password must be at least 8 characters long and contain at least one uppercase letter and one number and one symbol character.'
  })
  password?: string;

  @ApiProperty()
  @IsNotEmpty()
  token?: string;
}
