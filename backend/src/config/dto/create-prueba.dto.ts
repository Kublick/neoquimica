import { IsString } from 'class-validator';

export class CreatePruebaDto {
  @IsString()
  codigo: string;
  @IsString()
  abreviatura: string;
  @IsString()
  descripcion: string;
  @IsString()
  titulo: string;
  departamento: string;
  tipoMuestra: string;
  metodo: string;
  print: string;
  formula: string;
  boldText: string;
  ventaIndividual: boolean;
  antibiograma: boolean;
  unidades: string;
  precio: number;
  sexo: string;
  tipoResultado: string;
  decimales: number;
  tiempoProceso: string;
  indicaciones: string;
  notas: string;
  notasInternas: string;
  tipoValorNormalidad: string;
  valoresRango: [];
  valorNormalidadTexto: string;
}
