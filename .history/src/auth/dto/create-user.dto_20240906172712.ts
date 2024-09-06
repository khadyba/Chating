import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail(
    {},
    {
      message: 'Vous devez fournir une adresse email valide.',
    },
  )
  email: string;

  @IsNotEmpty()
  @Hint
  password: string;

  @IsString()
  firstname: string;
}
