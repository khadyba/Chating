import { Controller, Body, Post, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Request } from '@nestjs/common';
import { RequestWithUser } from './jwt.strategy';
import { UserService } from 'src/user/user.service';

export type AuthBody = { email: string; password: string };
export type CreateUser = { email: string; fisrtname: string; password: string };

// 1. Envoie un mot de passe et un email.
// 2. L' API te renvois un token securisé "acb123"
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}
  @Post('login')
  async login(@Body() authBody: AuthBody) {
    return await this.authService.login({ authBody });
  }
  @Post('register')
  async regis(@Body() authBody: AuthBody) {
    return await this.authService.login({ authBody });
  }
  // 3. Tu renvoies ton token sécurisé "123abc"
  @UseGuards(JwtAuthGuard)
  @Get()
  async authenticateUser(@Request() req: RequestWithUser) {
    return await this.userService.getUser({
      userId: req.user.userId,
    });
  }
}
