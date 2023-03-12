import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { skip } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from './dto/post.dto';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}
  async createPost(user: User, dto: CreatePostDto) {
    try {
      const post = await this.prisma.post.create({
        data: {
          text: dto.text,
          userId: user.id,
        },
      });
      return post;
    } catch (error) {
      throw error;
    }
  }
  async deletePost(user: User, id: number) {
    try {
      await this.prisma.post.deleteMany({
        where: {
          id: id,
          userId: user.id,
        },
      });
      //return post;
    } catch (error) {
      throw error;
    }
  }
  async getPost(skipNumber: number) {
    try {
      const posts = await this.prisma.post.findMany({
        skip: skipNumber * 5,
        take: 5,
      });
      return posts;
    } catch (error) {
      throw error;
    }
  }
}
