import { Injectable, Query } from '@nestjs/common';
import { CreateLoginDto } from './dto/create-login.dto';
import { UpdateLoginDto } from './dto/update-login.dto';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository, Like } from 'typeorm';
import { LoginGurad } from './entities/login.entity';

import { Tags } from './entities/tags.entity';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(LoginGurad) private readonly user: Repository<LoginGurad>,

    @InjectRepository(Tags) private readonly tag: Repository<Tags>,
  ) {}

  async addTags(params: { tags: string[]; userId: number }) {
    const userInfo = await this.user.findOne({ where: { id: params.userId } });
    const tagList: Tags[] = [];
    for (let i = 0; i < params.tags.length; i++) {
      const T = new Tags();
      T.tags = params.tags[i];
      await this.tag.save(T);
      tagList.push(T);
    }
    userInfo.tags = tagList;
    console.log(userInfo, 1);
    return this.user.save(userInfo);
  }

  create(createLoginDto: CreateLoginDto) {
    const data = new LoginGurad();
    data.name = CreateLoginDto.name;
    // data.age = CreateLoginDto.;
    return this.user.save(data);
  }
  async findAll(query: { keyWord: string; page: number; pageSize: number }) {
    const data = await this.user.find({
      where: {
        name: Like(`%${query.keyWord}%`),
      },
      order: {
        id: 'DESC',
      },
      skip: (query.page - 1) * query.pageSize,
      take: query.pageSize,
    });
    const total = await this.user.count({
      where: {
        name: Like(`%${query.keyWord}%`),
      },
    });
    return {
      data,
      total,
    };
  }

  update(id: number, updateUserDto: UpdateLoginDto) {
    return this.user.update(id, UpdateLoginDto);
  }

  remove(id: number) {
    return this.user.delete(id);
  }

  findOne(id: number) {
    return `This action returns a #${id} login`;
  }
}
