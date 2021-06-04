import { IsString, MinLength } from 'class-validator';

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
  birthDate: Date;
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
}
