import { Injectable } from '@nestjs/common';
import { AuthBody } from './auth.controller';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}
  async login({ authBody }: { authBody: AuthBody }) {
    async login({ authBody }: { authBody: LogUserDto }) {
        try {
          const { email, password } = authBody;
    
          const existingUser = await this.prisma.user.findUnique({
            where: {
              email,
            },
          });
    
          if (!existingUser) {
            throw new Error("L'utilisateur n'existe pas.");
          }
    
          const isPasswordValid = await this.isPasswordValid({
            password,
            hashedPassword: existingUser.password,
          });
    
          if (!isPasswordValid) {
            throw new Error('Le mot de passe est invalide.');
          }
          return this.authenticateUser({
            userId: existingUser.id,
          });
        } catch (error) {
          return { error: true, message: error.message };
        }
      }
    
  }
  
}
