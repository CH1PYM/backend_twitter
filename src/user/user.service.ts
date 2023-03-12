import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/updateUser.dto';

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
}
