import { Controller, Get } from '@nestjs/common';
import path from 'path';
// le prefix de tout les route concernant 
@Controller(prefix: 'user')
export class UserController {
    @Get(path: 'user')
    getUser() {
        return this.appService.getUser();
    }
}
