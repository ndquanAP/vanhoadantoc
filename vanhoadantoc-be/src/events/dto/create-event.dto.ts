import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateEventDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  date: string;

  @IsNotEmpty()
  tag: string;

  @IsOptional()
  image?: string;
}
