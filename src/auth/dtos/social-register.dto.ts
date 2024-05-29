import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class SocialRegisterDto {
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


  // @ApiProperty()
  // @IsNotEmpty()
  // token?: string;
}
