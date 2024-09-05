import { Controller, Body, Post } from '@nestjs/common';

type AuthBody = { email: string; password: number };
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  async login(@Body() authBody: AuthBody) {
    console.log(authBody);
    return '';
  }
}
