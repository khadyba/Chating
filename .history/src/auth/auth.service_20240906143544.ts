import { Injectable } from '@nestjs/common';
import { AuthBody, CreateUser } from './auth.controller';
import { PrismaService } from 'src/prisma.service';
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import passport from 'passport';
// import { UserPayload } from './jwt.strategy';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}
  async login({ authBody }: { authBody: AuthBody }) {
    const { email, password } = authBody;
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

    return this.authenticateUser({
      userId: existingUser.id,
    });
  }

  async register({ registerBody }: { registerBody: CreateUser }) {
    const { email, firstname, password } = registerBody;
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!existingUser) {
      throw new Error('un compte existe déja à cette adresse email');
    }
      const hashPassword = await this.hashPassword({ password });

      this.prisma.user.create({
        data: {
            email;
            
        }
      })
   
    return this.authenticateUser({
      userId: existingUser.id,
    });
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

  private authenticateUser({ userId }: { userId: number }) {
    const payload = { userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
