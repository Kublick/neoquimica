import { IsString, MinLength } from 'class-validator';
import { Cliente } from 'src/clientes/schemas/clientes.schema';
import { Sucursal } from 'src/sucursal/schema/sucursal.schema';

export class CreatePatientDto {
  shortId: string;
  @IsString()
  @MinLength(3, {
    message: 'El nombre minimo debe contener 3 caracteres',
  })
  name: string;
  @IsString()
  @MinLength(3, { message: 'El apellido minimo requiere 3 caracteres' })
  lastName: string;
  birthDate: string;
  @IsString()
  phone: string;
  @IsString()
  email: string;
  orders: [];
  @IsString()
  gender: string;
  @IsString()
  address: string;
  @IsString()
  notes: string;
  clienteRef: Cliente;
  sucursalRef: Sucursal;
}
