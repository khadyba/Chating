import { Controller, Body, Post } from '@nestjs/common';

type AuthBody = 
@Controller('auth')
export class AuthController {
  @Post('login')
  async login(@Body() authBody:) {
    console.log(authBody);
    return '';
  }
}
