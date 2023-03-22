import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  Headers,
  HttpCode,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginService } from '../login/login.service';
import { ConfigService } from '@nestjs/config';
import type { request } from 'express';
import { userPipe } from './users.pipe';
import { ApiOperation, ApiTags, ApiParam, ApiResponse, ApiBody } from '@nestjs/swagger'

@Controller({
  path: 'users',
  version: '1',
})
@ApiTags('用户接口')
export class UsersController {
  // eslint-disable-next-line prettier/prettier
  constructor(
    private readonly usersService: UsersService,
    private readonly LoginService: LoginService, // private configService: ConfigService,
  ) {}

  @ApiOperation({
    summary: '创建用户',
    description: '请求该接口创建一个新的用户',
  })
  // @ApiBody({ description: '用户名',required: true})
  @ApiResponse({ status: 201, description: '创建成功' })
  @Post('create-user')
  create(@Request() req, @Body(userPipe) createUserDto: CreateUserDto ) {
    this.usersService.create(createUserDto)
    // return {
    //   code: 200,
    //   data: req.body,
    // };
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  findOne(@Param('id') id: string, @Headers() header) {
    console.log(id, '------');
    console.log(header, 'header');
    console.log(
      this.LoginService.findAll({ keyWord: 'lui', page: 1, pageSize: 10 }),
    );
    // console.log('configService', this.configService);
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
