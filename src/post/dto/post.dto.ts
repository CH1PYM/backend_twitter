import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  text: string;
}
export class DeletePostDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
