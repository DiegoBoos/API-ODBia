import { IsNotEmpty, IsString } from 'class-validator';

export class ChatDto {
//   @IsNotEmpty()
//   @IsString()
//   readonly prompt: string; // Obligatoria
  
  @IsNotEmpty()
  @IsString()
  readonly humanMessage: string; // Obligatoria

  @IsNotEmpty()
  @IsString()
  readonly model: string; // Obligatoria
  
}
