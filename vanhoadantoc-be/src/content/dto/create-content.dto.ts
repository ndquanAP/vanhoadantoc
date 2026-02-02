import { IsString, IsEnum, IsObject, IsOptional } from 'class-validator';
import { Prisma } from '@prisma/client';

export enum ContentType {
  NEWS = 'news',
  EVENT = 'event',
  POLICY = 'policy',
  ETHNIC = 'ethnic',
  RELIGIOUS = 'religious',
  LOCATION = 'location',
  SITE = 'site',
}

export class CreateContentDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsEnum(ContentType)
  type: ContentType;

  @IsOptional()
  @IsString()
  imgCover?: string;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>; // { category, location } for site type

  @IsObject()
  content: Prisma.InputJsonValue; // TipTap JSON
}
