import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
constructor(private readonly prisma: PrismaService) {}
  getUsers() {
    return [
      {
        id: 1,
        firsname: 'khady',
      },
    ];
  }
}
