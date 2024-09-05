import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
    constructor(private )
  getUsers() {
    return [
      {
        id: 1,
        firsname: 'khady',
      },
    ];
  }
}
