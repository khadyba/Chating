import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
    constructor(private readonly prisma: Pris)
  getUsers() {
    return [
      {
        id: 1,
        firsname: 'khady',
      },
    ];
  }
}
