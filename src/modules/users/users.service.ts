import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateUserDTO, FindUserDTO, UpdateUserDTO } from './dto';
import { UserGurad } from '@/entities/index';
import { Repository, Like } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserGurad) private readonly user: Repository<UserGurad>
  ){}

  async create(createUserDto: CreateUserDTO) {
    const userInfo = await this.user.findOne({ where: { name: createUserDto.name } })
    if(userInfo?.name){
      throw new BadRequestException('创建失败，用户已存在')
    }
    await this.user.save(createUserDto)
  }

  async findAll(dto: any) {
    return await this.user.find(dto)
  }

  async findOne(dto: any) {
    const data = await this.user.findOne({ where: { id : dto.id } })
    if(!data){
      throw new BadRequestException('用户不存在')
    }
    return data
  }

  update(id: number, updateUserDto: UpdateUserDTO) {
    // this.user.findOne()
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
