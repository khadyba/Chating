import { Body, Injectable, Post } from '@nestjs/common';

@Injectable()
export class AuthService {
  @Post('login')
  async login(@Body() authBody: LogUserDto) {
    console.log(authBody);
    return await this.authService.login({
      authBody,
    });
  }
}
