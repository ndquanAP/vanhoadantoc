import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, ParseIntPipe } from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  findAll(@Query('page') page?: string, @Query('limit') limit?: string) {
    return this.newsService.findAll(
      page ? parseInt(page, 10) : 1,
      limit ? parseInt(limit, 10) : 10,
    );
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.newsService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() dto: CreateNewsDto) {
    return this.newsService.create(dto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateNewsDto) {
    return this.newsService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.newsService.remove(id);
  }
}
