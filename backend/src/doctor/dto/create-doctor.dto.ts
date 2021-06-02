import { IsString, MinLength } from 'class-validator';

export class CreateDoctorDto {
  @IsString()
  @MinLength(5, {
    message: 'El nombre debe contener al minimo 5 caracteres',
  })
  name: string;
  @IsString()
  phone: string;
  @IsString()
  career: string;
  @IsString()
  email: string;
}
