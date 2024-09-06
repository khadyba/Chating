import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail(
    {},
    {
        message: 'Vous'
    }
  )
  email: string;

  @IsNotEmpty()
  password: string;

  @IsString()
  firstname: string;
}
