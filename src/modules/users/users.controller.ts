import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  Delete,
  Request,
  Headers,
  HttpCode,
  UseInterceptors,
  CacheInterceptor,
  ClassSerializerInterceptor
} from '@nestjs/common';
import { UsersService } from './users.service';
import { LoginService } from '../login/login.service';
import { ConfigService } from '@nestjs/config';
import { query, request } from 'express';
import { userPipe } from '@/pipe/index';
import { ApiOperation, ApiTags, ApiParam, ApiOkResponse, ApiResponse, ApiBody } from '@nestjs/swagger'
import {
  CreateUserResult,
  DeleteUsersResult,
  FindUserResult,
  FindUsersResult,
  PaginateResult,
  UpdateUserResult
} from './results'

import {
  CreateUserDTO,
  DeleteUsersDTO,
  FindUserDTO,
  PaginateUserDTO,
  UpdateUserDTO
} from './dto'

import { PaginateSerialize, UserSerialize } from './serializes'


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

  @ApiOperation({
    summary: '创建用户',
    description: '请求该接口创建一个新的用户',
  })
  @ApiOkResponse({ description: 'OK', type: CreateUserResult })
  @ApiResponse({ status: 201, description: '创建成功' })
  @Post('create-user')
  async create(@Request() req, @Body(userPipe) createUserDto: CreateUserDTO ) {
    await this.usersService.create(createUserDto)
    return true
  }

  @Get('/list')
  @ApiOperation({ summary: '查找多个用户' })
  @ApiOkResponse({ description: 'OK', type: PaginateResult })
  // @UseInterceptors(ClassSerializerInterceptor, CacheInterceptor)
  @UseInterceptors(ClassSerializerInterceptor)
  async findAll(@Query() dto: FindUserDTO) {
    const data = await this.usersService.findAll(dto);
    return data.map(item => new UserSerialize(item))
  }

  @Get('/one')
  @HttpCode(200)
  @UseInterceptors(ClassSerializerInterceptor)
  async findOne(@Query() query: FindUserDTO) {
    const data = await this.usersService.findOne(query);
    console.log('data-----',data)
    return new UserSerialize(data)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDTO) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
