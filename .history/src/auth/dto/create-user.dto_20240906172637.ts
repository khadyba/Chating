import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail(
    {},
    {
    message: 'Vous devez fournir une adresse email valide.',
    }
  )
  email: string;

  @IsNotEmpty()
  password: string;

  @IsString()
  firstname: string;
}
