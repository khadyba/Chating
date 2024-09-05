import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
    constructor(private readonly prisma: Pr)
  getUsers() {
    return [
      {
        id: 1,
        firsname: 'khady',
      },
    ];
  }
}
