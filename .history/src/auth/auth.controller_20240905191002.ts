import { Controller, Body, Post } from '@nestjs/common';

type Au
@Controller('auth')
export class AuthController {
  @Post('login')
  async login(@Body() authBody: { email: string; password: number }) {
    console.log(authBody);
    return '';
  }
}
