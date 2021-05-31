import { IsString } from 'class-validator';

export class CreateSucursalDto {
  @IsString()
  name: string;
}
