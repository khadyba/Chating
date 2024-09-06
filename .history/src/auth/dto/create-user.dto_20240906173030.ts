import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail(
    {},
    {
      message: 'Vous devez fournir une adresse email valide.',
    },
  )
  email: string;

  @IsNotEmpty()
  @MinLength(8 {
    message: 'Votre mot de passe doit fair'
  })
  password: string;

  @IsString({
    message: 'Vous devez fournir un prénom',
  })
  firstname: string;
}
