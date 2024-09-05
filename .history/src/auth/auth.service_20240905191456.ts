import { Injectable } from '@nestjs/common';
import { AuthBody } from './auth.controller';

@Injectable()
export class AuthService {
  async login({ authBody }: { authBody: AuthBody}) {}
}
