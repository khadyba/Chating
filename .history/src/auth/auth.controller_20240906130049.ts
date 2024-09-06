import { Controller, Body, Post, Get } from '@nestjs/common';
import { AuthService } from './auth.service';

export type AuthBody = { email: string; password: string };
// 1. Envoi
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  async login(@Body() authBody: AuthBody) {
    return await this.authService.login({ authBody });
  }
  @Get()
  async authenticate() {
    return;
  }
}
