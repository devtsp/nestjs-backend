import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  @Get('me')
  // @GetUser allow us to pass the already handled "request"
  // object as argument to the controller
  getMe(@GetUser() user: User) {
    return user;
  }
}
