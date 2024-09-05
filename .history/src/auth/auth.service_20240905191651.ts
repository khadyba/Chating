import { Injectable } from '@nestjs/common';
import { AuthBody } from './auth.controller';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService, ) {}
  async login({ authBody }: { authBody: AuthBody }) {}
}
