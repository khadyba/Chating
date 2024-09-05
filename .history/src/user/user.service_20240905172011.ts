import { Get, Injectable } from '@nestjs/common';

@Injectable(
    @Get()
    get
)
export class UserService {}
