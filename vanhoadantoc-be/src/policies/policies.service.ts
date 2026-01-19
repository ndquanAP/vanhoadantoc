import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePolicyDto } from './dto/create-policy.dto';
import { UpdatePolicyDto } from './dto/update-policy.dto';

@Injectable()
export class PoliciesService {
  constructor(private prisma: PrismaService) {}

  async findAll(page = 1, limit = 10, category?: string) {
    const skip = (page - 1) * limit;
    const where = category ? { category } : {};

    const [items, total] = await Promise.all([
      this.prisma.policy.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.policy.count({ where }),
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
    const policy = await this.prisma.policy.findUnique({ where: { id } });
    if (!policy) throw new NotFoundException('Policy not found');
    return policy;
  }

  async create(dto: CreatePolicyDto) {
    return this.prisma.policy.create({ data: dto });
  }

  async update(id: number, dto: UpdatePolicyDto) {
    await this.findOne(id);
    return this.prisma.policy.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.policy.delete({ where: { id } });
  }

  async getCategories() {
    const policies = await this.prisma.policy.findMany({
      select: { category: true },
      distinct: ['category'],
    });
    return policies.map((p) => p.category);
  }
}
