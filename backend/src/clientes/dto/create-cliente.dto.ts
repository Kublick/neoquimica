import { IsString } from 'class-validator';

export class CreateClienteDto {
  @IsString()
  shortId: string;
  @IsString()
  nombre: string;
  @IsString()
  tarifa: string;
  @IsString()
  email: string;
  @IsString()
  telefono: string;
  @IsString()
  direccion: string;
  @IsString()
  tipoPago: string;
  @IsString()
  rfc: string;
  @IsString()
  notes: string;
  envio: [];

  webLabLogin: string;

  webLabPassword: string;
  listaPrecios: [];
}
