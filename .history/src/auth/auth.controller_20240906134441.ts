import { Controller, Body, Post, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { request, Request } from 'http';

export type AuthBody = { email: string; password: string };

// 1. Envoie un mot de passe et un email.
// 2. L' API te renvois un token securisé "acb123"
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  async login(@Body() authBody: AuthBody) {
    return await this.authService.login({ authBody });
  }
  // 3. Tu renvoies ton token sécurisé "123abc"
  @UseGuards(JwtAuthGuard)
  @Get()
  async authenticateUser(@Request() request) {
    console.log(req);
    return;
  }
}
