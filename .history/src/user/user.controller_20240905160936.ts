import { Controller, Get } from '@nestjs/common';
import path from 'path';
import { UserService } from 'src/user/user.service';
// le prefix de tout les route concernant ce controller
@Controller(prefix: 'users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get(path: 'settings')
    getUsers() {
        return this.userService.getUser();
    }
}
