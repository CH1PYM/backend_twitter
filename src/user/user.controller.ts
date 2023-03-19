import {
  Controller,
  Get,
  UseGuards,
  Body,
  Put,
  Post,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorater/get-user.decorator';
import { JwtAuthGuard } from 'src/auth/guard';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private service: UserService) {}
  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@GetUser() user) {
    return user;
  }
  @UseGuards(JwtAuthGuard)
  @Post('me/update')
  updateProfile(@GetUser() user, @Body() dto: UpdateUserDto) {
    return this.service.updateUser(user, dto);
  }
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getStrangeProfile(
    @GetUser() user,
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.service.getStrangeProfile(id);
  }
}
