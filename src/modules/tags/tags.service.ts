import { Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { TagsEntity } from '@/entities/index';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(TagsEntity)
    private readonly TagsEntity: Repository<TagsEntity>,
  ) {}

  async create(createTagDto: any) {
    return await this.TagsEntity.save(createTagDto);
  }

  findAll() {
    return `This action returns all tags`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tag`;
  }

  update(id: number, updateTagDto: UpdateTagDto) {
    return `This action updates a #${id} tag`;
  }

  remove(id: number) {
    return `This action removes a #${id} tag`;
  }
}
