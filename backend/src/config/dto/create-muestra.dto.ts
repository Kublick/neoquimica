import { IsString } from 'class-validator';

export class CreateMuestraDto {
  @IsString()
  clave: string;
  @IsString()
  descripcion: string;
  @IsString()
  nombreTubo: string;
  observaciones: string;
  codigoBarras: boolean;
  excluirStatus: boolean;
}
