import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto, SignInUser } from './dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}
  async signup(dto: CreateUserDto) {
    const hash = await argon.hash(dto.password);
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          username: dto.username,
          hash: hash,
        },
      });
      delete user.hash;
      return user;
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ForbiddenException('Credentials taken');
      }
      throw error;
    }
  }
  async signin(dto: SignInUser) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!user) {
      throw new ForbiddenException('Credentials incorrect');
    }
    const pwMatch = await argon.verify(user.hash, dto.password);
    if (!pwMatch) {
      throw new ForbiddenException('Credentials incorrect');
    }
    return this.signToken(user.id, user.email);
  }
  async signToken(userId: number, email: string): Promise<{ access_token }> {
    const payload = {
      sub: userId,
      email,
    };
    //pridat secret vec
    const token = await this.jwt.sign(payload);
    return { access_token: token };
  }
}
