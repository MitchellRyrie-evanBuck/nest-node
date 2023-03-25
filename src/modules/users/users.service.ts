import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDTO, FindUserDTO, UpdateUserDTO } from './dto';
import { UserEntity } from '@/entities/index';
import { Repository, Like } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ICrudService } from '@/types';
import { encryptPassword, makeSalt } from '@/utils/cryptogram.util';

@Injectable()
export class UsersService implements ICrudService {
  constructor(
    @InjectRepository(UserEntity) private readonly user: Repository<UserEntity>,
  ) {}

  async createOne(createUserDto: CreateUserDTO) {
    if (createUserDto.password !== createUserDto?.passwordRepeat) {
      throw new NotFoundException('两次输入的密码不一致，请检查');
    }
    const userInfo = await this.user.findOne({
      where: {
        username: createUserDto.username,
      },
    });
    if (userInfo) {
      throw new BadRequestException('创建失败，用户已存在');
    }

    const salt = makeSalt(); // 制作密码盐
    const hashPassword = await encryptPassword(createUserDto.password, salt); // 加密密码
    let userNewInfo: Partial<UserEntity> = new UserEntity();
    userNewInfo = { ...createUserDto, password: hashPassword, salt: salt };
    await this.user.save(userNewInfo);
  }

  async findMany(dto: any) {
    return await this.user.find(dto);
  }

  async findOne(dto: any) {
    const data = await this.user.findOne({ where: { id: dto.id } });
    if (!data) {
      throw new BadRequestException('用户不存在');
    }
    return data;
  }

  async updateOne(id: number, updateUserDto: UpdateUserDTO) {
    const existingUser = await this.user.findOne({ where: { id } });
    if (!existingUser) {
      throw new BadRequestException('更新失败，用户已存在');
    }
    existingUser.gender = updateUserDto.gender;
    existingUser.age = updateUserDto.age;
    existingUser.mobile = updateUserDto.mobile;
    this.user.save(existingUser);
  }

  async deleteOne(id: number) {
    await this.user.delete(id);
  }
}
