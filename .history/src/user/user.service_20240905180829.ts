import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
    constructor
  getUsers() {
    return [
      {
        id: 1,
        firsname: 'khady',
      },
    ];
  }
}
