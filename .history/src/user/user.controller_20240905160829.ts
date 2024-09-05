import { Controller, Get } from '@nestjs/common';
import path from 'path';
import { userService } from 'src/app.service';
// le prefix de tout les route concernant ce controller
@Controller(prefix: 'users')
export class UserController {
    constructor(private readonly userService: AppService) {}

    @Get(path: 'settings')
    getUsers() {
        return this.appService.getUser();
    }
}
