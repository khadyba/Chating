import { Get, Injectable } from '@nestjs/common';

@Injectable(
    @Get()
    getUsers
)
export class UserService {}
