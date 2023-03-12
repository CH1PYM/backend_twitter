import {
  Controller,
  UseGuards,
  Post,
  Body,
  ParseIntPipe,
  Param,
  Delete,
  Get,
  Put,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorater/get-user.decorator';
import { JwtAuthGuard } from 'src/auth/guard';
import { CreatePostDto } from './dto/post.dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}
  @UseGuards(JwtAuthGuard)
  @Post('create')
  createPost(@GetUser() user, @Body() dto: CreatePostDto) {
    return this.postService.createPost(user, dto);
  }
  @UseGuards(JwtAuthGuard)
  @Delete('delete/:id')
  deletePost(
    @GetUser() user,
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.postService.deletePost(user, id);
  }
  @UseGuards(JwtAuthGuard)
  @Get('get/:pageNumber')
  getPost(
    @GetUser() user,
    @Param('pageNumber', ParseIntPipe)
    pageNumber: number,
  ) {
    return this.postService.getPost(pageNumber);
  }
}
