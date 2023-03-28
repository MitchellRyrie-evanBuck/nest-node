import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto, UpdateTagDto } from './dto/index';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '@/decorator';

@Controller({
  path: 'tags',
  version: '1',
})
@ApiTags('标签接口')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Public()
  @Post('create-tags')
  async create(@Body() createTagDto: CreateTagDto) {
    await this.tagsService.create(createTagDto);
    return true;
  }

  @Get()
  findAll() {
    return this.tagsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tagsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTagDto: UpdateTagDto) {
    return this.tagsService.update(+id, updateTagDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tagsService.remove(+id);
  }
}
