import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.event.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number) {
    const event = await this.prisma.event.findUnique({ where: { id } });
    if (!event) throw new NotFoundException('Event not found');
    return event;
  }

  async create(dto: CreateEventDto) {
    return this.prisma.event.create({ data: dto });
  }

  async update(id: number, dto: UpdateEventDto) {
    await this.findOne(id);
    return this.prisma.event.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.event.delete({ where: { id } });
  }
}
