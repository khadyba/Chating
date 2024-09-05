import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service'; // Assurez-vous que le chemin est correct

@Controller('users') // Utilisez la syntaxe correcte ici
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }
  @Get('/:userId')
  // localhost:3000/users/3000
  getUser(@Param('userId') userId: number) {
    return this.userService.getUser({
      userId,
    });
  }
}
