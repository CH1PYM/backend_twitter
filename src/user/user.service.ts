import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/updateUser.dto';
import { createReadStream } from 'fs';
import { join } from 'path';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async updateUser(user, dto) {
    try {
      const userUpdate = await this.prisma.user.update({
        where: { id: user.id },
        data: { ...dto },
      });
      delete userUpdate.hash;
      return userUpdate;
    } catch (error) {
      throw error;
    }
  }
  async getStrangeProfile(id: number) {
    try {
      const userProfile: User = await this.prisma.user.findUnique({
        where: { id },
      });
      const { username } = userProfile;
      return username;
    } catch (error) {
      throw error;
    }
  }

  async addProfileImgToUser(id: number, link: string) {
    const updateObject = { profileImg: link };
    try {
      const updateUser = await this.prisma.user.update({
        where: {
          id: id,
        },
        data: updateObject,
      });
      return updateUser.profileImg;
    } catch (error) {
      throw error;
    }
  }
  async addBackgroundImgToUser(id: number, link: string) {
    const updateObject = { backgroundImg: link };
    try {
      const updateUser = await this.prisma.user.update({
        where: {
          id: id,
        },
        data: updateObject,
      });
      return updateUser.backgroundImg;
    } catch (error) {
      throw error;
    }
  }
  findBackgroundImg(name: string) {
    return createReadStream(
      join(process.cwd(), `uploads/backgroundImages/${name}`),
    );
  }
  findProfileImg(name: string) {
    return createReadStream(
      join(process.cwd(), `uploads/profileImages/${name}`),
    );
  }
  async downloadImageById(type: string, id: number) {
    try {
      const userProfile: User = await this.prisma.user.findUnique({
        where: { id },
      });
      const { profileImg } = userProfile;
      this.findProfileImg(profileImg);
    } catch (error) {
      throw error;
    }
  }
}
