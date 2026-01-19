import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, ParseIntPipe } from '@nestjs/common';
import { PoliciesService } from './policies.service';
import { CreatePolicyDto } from './dto/create-policy.dto';
import { UpdatePolicyDto } from './dto/update-policy.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('policies')
export class PoliciesController {
  constructor(private readonly policiesService: PoliciesService) {}

  @Get()
  findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('category') category?: string,
  ) {
    return this.policiesService.findAll(
      page ? parseInt(page, 10) : 1,
      limit ? parseInt(limit, 10) : 10,
      category,
    );
  }

  @Get('categories')
  getCategories() {
    return this.policiesService.getCategories();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.policiesService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() dto: CreatePolicyDto) {
    return this.policiesService.create(dto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePolicyDto) {
    return this.policiesService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.policiesService.remove(id);
  }
}
