import { IsNotEmpty, IsString } from 'class-validator';

export class TranslateDto {
  @IsNotEmpty()
  @IsString()
  readonly prompt: string; // Obligatoria
  
  @IsNotEmpty()
  @IsString()
  readonly lang: string; // Obligatoria
  
  @IsNotEmpty()
  @IsString()
  readonly model: string; // Obligatoria
}
