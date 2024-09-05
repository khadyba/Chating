import { Controller, Get } from '@nestjs/common';
import path from 'path';
// le prefix de tout les route concernant ce controller
@Controller(prefix: 'users')
export class UserController {
    constructor(private readonly appService: AA)
    @Get(path: 'settings')
    getUsers() {
        return this.appService.getUser();
    }
}
