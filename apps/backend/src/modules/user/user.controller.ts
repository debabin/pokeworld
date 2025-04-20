import { Controller, Get, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UseJwtAuth } from '../auth/jwt';

@ApiTags('user')
@Controller('user')
export class UserController {

    @Get()
    @UseJwtAuth()
    getProfile(@Request() request) {
        const userId = request.user.id;
        console.log('@UserController', userId);
        return request.user;
    }
}