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
      throw new BadRequestException('更新失败，用户已存在')
    }
    await this.user.save(createUserDto)
  }

  async findAll(dto: any) {
    console.log('dto',dto)
    return await this.user.find(dto)
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDTO) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
