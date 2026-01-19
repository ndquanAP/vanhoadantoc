import { IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class CreateNewsDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  excerpt: string;

  @IsNotEmpty()
  content: string;

  @IsOptional()
  image?: string;

  @IsOptional()
  @IsBoolean()
  isNew?: boolean;
}
