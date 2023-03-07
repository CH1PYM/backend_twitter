import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { GetUser } from 'src/auth/decorater/get-user.decorator';
import { JwtAuthGuard } from 'src/auth/guard';

@Controller('users')
export class UserController {
  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@GetUser() user) {
    return user;
  }
}
