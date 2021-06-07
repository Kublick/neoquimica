import { IsString } from 'class-validator';

export class CreateMetodoDto {
  @IsString()
  descripcion: string;
}
