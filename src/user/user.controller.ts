import {
  Controller,
  Get,
  UseGuards,
  Body,
  Put,
  Post,
  Param,
  ParseIntPipe,
  UseInterceptors,
  UploadedFile,
  StreamableFile,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Observable, of } from 'rxjs';
import { GetUser } from 'src/auth/decorater/get-user.decorator';
import { JwtAuthGuard } from 'src/auth/guard';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UserService } from './user.service';
import { v4 as uuidv4 } from 'uuid';
import { Writable } from 'stream';

import { createReadStream } from 'fs';
import { join } from 'path';
import { Express } from 'express';

import path = require('path');
import { User } from '@prisma/client';

export const storage = {
  storage: diskStorage({
    destination: './uploads/profileImages',
    filename: (req, file, cb) => {
      const filename: string =
        path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
      const extension: string = path.parse(file.originalname).ext;

      cb(null, `${filename}${extension}`);
    },
  }),
};

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
  /*@UseGuards(JwtAuthGuard)*/
  @Get('get-username/:id')
  getStrangeProfile(
    @GetUser() user,
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.service.getStrangeProfile(id);
  }
  @Get('download-profile-image/:id')
  downloadProfileImage(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.service.getStrangeProfile(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('upload/profileImg')
  @UseInterceptors(FileInterceptor('file', storage))
  uploadProfileImage(@GetUser() user: User, @UploadedFile() file) {
    return this.service.addProfileImgToUser(user.id, file.filename);
  }
  @UseGuards(JwtAuthGuard)
  @Get('download')
  getProfileImg(@GetUser() user: User, @Res() res: Writable) {
    const file = this.service.findProfileImg(user.profileImg);
    file.pipe(res);
  }
  @UseGuards(JwtAuthGuard)
  @Post('upload/profileImg')
  @UseInterceptors(FileInterceptor('file', storage))
  uploadBackgroundImage(@GetUser() user: User, @UploadedFile() file) {
    return this.service.addBackgroundImgToUser(user.id, file.filename);
  }
  @UseGuards(JwtAuthGuard)
  @Get('download')
  getBackgroundImage(@GetUser() user: User, @Res() res: Writable) {
    const file = this.service.findBackgroundImg(user.backgroundImg);
    file.pipe(res);
  }
  //for react test
  @Get('downloadk')
  getBackgroundImagek(@GetUser() user: User, @Res() res: Writable) {
    const file = this.service.findProfileImg(
      '2023-03-10_13-19b6ee51d1-fda9-49d2-9c8e-b9210770f80b.png',
    );
    file.pipe(res);
  }
}
