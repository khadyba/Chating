import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service'; // Assurez-vous que le chemin est correct

@Controller('users') // Utilisez la syntaxe correcte ici
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get() // Utilisez la syntaxe correcte ici
    getUsers() {
        return this.userService.getUsers();
    }
}
