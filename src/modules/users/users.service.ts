import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDTO, FindUserDTO, UpdateUserDTO, CreateTagsDTO } from './dto';
import { UserEntity, TagsEntity } from '@/entities/index';
import { Repository, Like } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ICrudService } from '@/types';
import { encryptPassword, makeSalt } from '@/utils/cryptogram.util';

@Injectable()
export class UsersService implements ICrudService {
  constructor(
    @InjectRepository(UserEntity) private readonly user: Repository<UserEntity>,
    @InjectRepository(TagsEntity) private readonly tags: Repository<TagsEntity>
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

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.user.findOne({ where: { username } });
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async addTags({ id , tags }: CreateTagsDTO ): Promise<any>{
    const userInfo = await this.user.findOne({ where: { id: Number(id)} });
    const tagList: TagsEntity[] = [];
    if(tags.length){
      for (let i = 0; i < tags.length; i++) {
        // const T = new TagsEntity();
        const tagsEnty = await this.tags.findOne({ where: { id: Number(tags[i]) }})
        if (!tagsEnty){
          new BadRequestException(`${tags[i]} id 不存在`)
        }
        if (tagsEnty.author){
          tagsEnty.author = [...tagsEnty.author, userInfo] as UserEntity[]
        }else{
          tagsEnty.author = [userInfo] as UserEntity[]
        }
        console.log(tagsEnty)
        // T.tags = tags[i];
        await this.tags.save(tagsEnty);
        tagList.push(tagsEnty);
      }
    }
    
    userInfo.tags = tagList;
    console.log(userInfo, 1);
    return this.user.save(userInfo);
  }
}
