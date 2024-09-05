import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users') // Utilisez la syntaxe correcte ici
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }
  @Get('/:userId')
  getUser(@Param('userId') userId: number) {
    return this.userService.getUser({
      userId,
    });
  }
}
