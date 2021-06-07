import { IsString } from 'class-validator';

export class CreateMuestraDto {
  @IsString()
  clave: string;
  @IsString()
  descripcion: string;
  @IsString()
  nombreTubo: string;
  @IsString()
  observaciones: string;
  @IsString()
  codigo: string;
  @IsString()
  excluirStatus: string;
}
