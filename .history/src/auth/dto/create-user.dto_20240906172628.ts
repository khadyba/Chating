import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail(
    {},
    {
        message: 'Vous devez fournir une adresse email valid'
    }
  )
  email: string;

  @IsNotEmpty()
  password: string;

  @IsString()
  firstname: string;
}
