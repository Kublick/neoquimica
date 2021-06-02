import { IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { Sucursal } from 'src/sucursal/sucursal.entity';

export class CreateEmployeeDto {
  @IsString()
  @MinLength(5, {
    message: 'El nombre debe contener al minimo 5 caracteres',
  })
  name: string;
  @IsString()
  @MinLength(8, {
    message: 'El password debe contener al minimo 8 caracteres',
  })
  @MaxLength(20, {
    message: 'El password debe contener maximo 20 caracteres',
  })
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'El Password debe contener al menos una letra mayuscula, numeros y simbolos',
  })
  password: string;
  @IsString()
  sucursal: Sucursal;
  @IsString()
  role: string;
  registeredOn: Date;
}
