import { Injectable } from '@nestjs/common';
import { AuthBody } from './auth.controller';
import { PrismaService } from 'src/prisma.service';
import { hash, compare } from 'bcrypt';
// import { UserPayload } from './jwt.strategy';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService, private readonly jw) {}
  async login({ authBody }: { authBody: AuthBody }) {
    const { email, password } = authBody;

    const hashPassword = await this.hashPassword({ password });
    console.log({ hashPassword, password });
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!existingUser) {
      throw new Error("L'utilisateur n'existe pas.");
    }

    const IsvalidPassword = await this.IsvalidPassword({
      password,
      hashPassword: existingUser.password,
    });

    if (!IsvalidPassword) {
      throw new Error('le mot de passe est invalide.');
    }

    return existingUser.id;
  }
  private async hashPassword({ password }: { password: string }) {
    const hashPassword = await hash(password, 10);

    return hashPassword;
  }
  private async IsvalidPassword({
    password,
    hashPassword,
  }: {
    password: string;
    hashPassword: string;
  }) {
    const IsvalidPassword = await compare(password, hashPassword);
    return IsvalidPassword;
  }

  private authenticateUser({ userId }: { userId: string }) {
    const payload = { userId };
    return {
      access_token: this.jwtService.signAsync(payload),
    };
  }

}
