import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SessionDto {

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  sessionId: string;

}
