import { Injectable } from '@nestjs/common';
import { AuthBody } from './auth.controller';
import { PrismaService } from 'src/prisma.service';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}
  async login({ authBody }: { authBody: AuthBody }) {
    const { email, password } = authBody;

    const hashPassword = await this.hashPassword({ password });
    console.log({,});
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!existingUser) {
      throw new Error("L'utilisateur n'existe pas.");
    }

    const isPasswordSame = password === existingUser.password;

    if (!isPasswordSame) {
      throw new Error('le mot de passe est invalide.');
    }

    return existingUser;
  }
  async hashPassword({ password }: { password: string }) {
    const hashPassword = await bcrypt.hash(password, 10);

    return hashPassword;
  }
}
