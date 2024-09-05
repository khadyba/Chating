import { Controller, Get } from '@nestjs/common';
import path from 'path';
import { AppService } from 'src/app.service';
// le prefix de tout les route concernant ce controller
@Controller(prefix: 'users')
export class UserController {
    constructor(private readonly user: AppService) {}

    @Get(path: 'settings')
    getUsers() {
        return this.appService.getUser();
    }
}
