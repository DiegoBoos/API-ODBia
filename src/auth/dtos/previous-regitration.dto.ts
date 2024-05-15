import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class PreviousRegistrationDto {
  @ApiProperty()
  @IsOptional()
  fullName?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

}
