import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class ContentService {
  constructor(private prisma: PrismaService) {}

  async findAll(type?: string, page = 1, limit = 10) {
    const where = type ? { type } : {};
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      this.prisma.content.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.content.count({ where }),
    ]);

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: number) {
    return this.prisma.content.findUnique({
      where: { id },
    });
  }

  async create(dto: CreateContentDto) {
    return this.prisma.content.create({
      data: {
        type: dto.type,
        content: dto.content as Prisma.InputJsonValue,
      },
    });
  }

  async update(id: number, dto: UpdateContentDto) {
    const data: Prisma.ContentUpdateInput = {};
    if (dto.type) data.type = dto.type;
    if (dto.content) data.content = dto.content as Prisma.InputJsonValue;
    
    return this.prisma.content.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return this.prisma.content.delete({
      where: { id },
    });
  }

  async getTypes() {
    const types = await this.prisma.content.groupBy({
      by: ['type'],
      _count: { type: true },
    });
    return types.map((t) => ({ type: t.type, count: t._count.type }));
  }
}
