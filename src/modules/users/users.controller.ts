import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Put,
  Query,
  Delete,
  Request,
  Req,
  Headers,
  HttpCode,
  UseInterceptors,
  CacheInterceptor,
  ClassSerializerInterceptor,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { LoginService } from '../login/login.service';
import { ConfigService } from '@nestjs/config';
import type { query, request } from 'express';
import { userPipe } from '@/pipe/index';
import {
  ApiOperation,
  ApiTags,
  ApiParam,
  ApiOkResponse,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import {
  CreateUserResult,
  DeleteUsersResult,
  FindUserResult,
  FindUsersResult,
  PaginateResult,
  UpdateUserResult,
} from './results';

import {
  CreateUserDTO,
  DeleteUsersDTO,
  FindUserDTO,
  PaginateUserDTO,
  UpdateUserDTO,
} from './dto';

import { PaginateSerialize, UserSerialize } from './serializes';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '@/gurad';

@Controller({
  path: 'users',
  version: '1',
})
@ApiTags('用户接口')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly LoginService: LoginService,
  ) {}

  @ApiOperation({ summary: '创建用户' })
  @ApiOkResponse({ description: 'OK', type: CreateUserResult })
  @ApiResponse({ status: 201, description: '创建成功' })
  @ApiParam({ name: 'name', description: '姓名', required: true })
  @ApiParam({ name: 'password', description: '密码', required: true })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('create-user')
  async create(@Body(userPipe) createUserDto: CreateUserDTO) {
    await this.usersService.createOne(createUserDto);
    return true;
  }

  @Get('/list')
  @ApiOperation({ summary: '获取用户列表' })
  @ApiOkResponse({ description: 'OK', type: PaginateResult })
  // @UseInterceptors(ClassSerializerInterceptor, CacheInterceptor)
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async findAll(@Query() dto: FindUserDTO) {
    const data = await this.usersService.findMany(dto);
    return data.map((item) => new UserSerialize(item));
  }

  @Get('/one')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '根据ID查询用户' })
  @ApiOkResponse({ description: 'OK', type: PaginateResult })
  @UseInterceptors(ClassSerializerInterceptor)
  async findOne(@Query() query: FindUserDTO) {
    const data = await this.usersService.findOne(query);
    console.log('data-----', data);
    return new UserSerialize(data);
  }

  @Put('/update/:id')
  @ApiOperation({ summary: '更新一个用户' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'OK', type: UpdateUserResult })
  async update(
    @Param('id') id: string,
    @Req() req,
    @Body(userPipe) updateUserDto: UpdateUserDTO,
  ) {
    console.log('req', req);
    await this.usersService.updateOne(+id, updateUserDto);
    return true;
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: '删除一个用户' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'OK', type: DeleteUsersResult })
  async remove(@Param('id') id: string) {
    await this.usersService.deleteOne(+id);
    return true;
  }
}
