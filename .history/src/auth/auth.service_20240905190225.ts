import { Body, Injectable, Post } from '@nestjs/common';

@Injectable()
export class AuthService {
  @Post('login')
  async login(@Body() authBody: { email: string; password:num} ) {
    return '';
  }
}
