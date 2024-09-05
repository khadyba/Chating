import { Body, Injectable, Post } from '@nestjs/common';

@Injectable()
export class AuthService {
  @Post()
  async login(@Body() authB) {
    return '';
  }
}
