import { Injectable } from '@nestjs/common';
import { AuthBody } from './auth.controller';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}
  async login({ authBody }: { authBody: AuthBody }) {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email: authBody.email,
      },
    });

    if (!existingUser) {
      throw new Error("L'utilisateur n'existe pas.");
    }

    const is
    return existingUser;
  }
}
