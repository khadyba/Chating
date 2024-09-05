import { Controller, Get } from '@nestjs/common';
import path from 'path';
import { UserService } from 'src/user/user.service';


// le prefix de tout les route concernant ce controller
@Controller( 'users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('settings')
    getUsers() {
        return this.userService.getUser();
    }
}
