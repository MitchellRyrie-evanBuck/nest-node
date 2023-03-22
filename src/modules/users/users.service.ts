import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserGurad } from './entities/user.entity';
import { Repository, Like } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserGurad) private readonly user: Repository<UserGurad>
  ){}

  async create(createUserDto: CreateUserDto) {
    console.log('createUserDto',createUserDto)
    const userInfo = await this.user.findOne({ where: { name: createUserDto.name } })
    // console.log('userInfo',userInfo)
    // if(userInfo){
    //   return '已有该用户'
    // }
    this.user.save(createUserDto)
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
