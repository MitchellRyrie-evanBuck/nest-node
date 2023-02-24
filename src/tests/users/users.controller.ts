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

@Controller({
  path: 'users',
  version: '1',
})
export class UsersController {
  // eslint-disable-next-line prettier/prettier
  constructor(
    private readonly usersService: UsersService,
    private readonly LoginService: LoginService,
  ) {}

  @Post()
  create(@Request() req) {
    return {
      code: 200,
      data: req.body,
    };
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
    console.log(this.LoginService.findAll());
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
