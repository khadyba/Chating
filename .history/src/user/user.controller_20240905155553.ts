import { Controller, Get } from '@nestjs/common';
import path from 'path';

@Controller(prefix: 'user')
export class UserController {
    @Get(path)
}
