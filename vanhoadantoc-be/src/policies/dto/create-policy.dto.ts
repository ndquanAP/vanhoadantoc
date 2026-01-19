import { IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class CreatePolicyDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  excerpt: string;

  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  category: string;

  @IsOptional()
  image?: string;

  @IsOptional()
  @IsBoolean()
  isNew?: boolean;
}
