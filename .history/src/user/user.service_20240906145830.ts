import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  // gécupérer tout les users 
  async getUsers() {
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        firstname: true,
      },
    });
    return users;
  }
  async getUser({ userId }: { userId: number }) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: +userId,
      },
      select: {
        id: true,
        email: true,
        firstname: true,
      },
    });
    return user;
  }
}
