import { Injectable } from '@nestjs/common';
import { AuthBody } from './auth.controller';

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
        private readonly mailerService: MailerService,
      ) {}
  async login({ authBody }: { authBody: AuthBody }) {}
}
