import { IsString, IsEnum, IsObject } from 'class-validator';
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
  @IsEnum(ContentType)
  type: ContentType;

  @IsObject()
  content: Prisma.InputJsonValue; // TipTap JSON
}
