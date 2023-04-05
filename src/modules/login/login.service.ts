import { Injectable, Query, NotFoundException } from '@nestjs/common';
import { UpdateLoginDto, CreateLoginDto, LoginDTO } from './dto/';
import { InjectRepository } from '@nestjs/typeorm';
import { encryptPassword, makeSalt } from '@/utils/cryptogram.util';
import { Repository, Like } from 'typeorm';
import { LoginGurad, UserEntity } from '@/entities';
import { JwtService } from '@nestjs/jwt';
import { RedisInstance } from '@/db';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(LoginGurad) private readonly user: Repository<LoginGurad>,
    @InjectRepository(UserEntity)
    private readonly userEntity: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDTO: LoginDTO): Promise<any> {
    const user = await this.checkLoginForm(loginDTO);
    const token = await this.certificate(user);
    const redis = await RedisInstance.initRedis();
    redis.set(String(user.mobile), token);
    redis.expire(String(user.mobile), 60 * 60 * 24);
    return token;
  }
  // 生成 token
  async certificate(user: UserEntity) {
    const payload = {
      id: user.id,
      username: user.username,
      mobile: user.mobile,
    };
    const token = this.jwtService.sign(payload);
    return token;
  }

  // 登陆校验用户信息
  async checkLoginForm(loginDTO: LoginDTO): Promise<any> {
    const { mobile, password } = loginDTO;
    const user = await this.userEntity
      .createQueryBuilder('user')
      .addSelect('user.salt')
      .addSelect('user.password')
      .where('user.mobile = :mobile', { mobile })
      .getOne();

    if (!user) {
      throw new NotFoundException('用户不存在');
    }
    const { password: dbPassword, salt } = user;
    const currentHashPassword = encryptPassword(password, salt);
    if (currentHashPassword !== dbPassword) {
      throw new NotFoundException('密码错误');
    }

    return user;
  }

  async addTags(params: { tags: string[]; userId: number }) {
    return '';
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
