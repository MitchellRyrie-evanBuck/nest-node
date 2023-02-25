import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Res,
  Inject,
  ParseIntPipe,
  ParseUUIDPipe,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import { LoginService } from './login.service';
import { CreateLoginDto } from './dto/create-login.dto';
import { UpdateLoginDto } from './dto/update-login.dto';
import { PipePipe } from './login.pipe';
import * as svgCaptcha from 'svg-captcha';
import * as uuid from 'uuid';
import { LoginGuard } from './login.guard';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiProperty,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
console.log(uuid.v4);

@Controller({
  path: 'login',
  version: '1',
})
@ApiTags('登录接口')
@ApiBearerAuth()
@UseGuards(LoginGuard)
export class LoginController {
  // eslint-disable-next-line prettier/prettier
  constructor(private readonly loginService: LoginService) {}

  @ApiOperation({
    summary: '测试login',
    description: '请求该接口需要amdin权限',
  })
  @ApiResponse({ status: 403, description: '自定义返回信息' })
  @ApiParam({ name: '', description: '获取二维码', required: true })
  @Get('code')
  createCaptcha(@Req() req, @Res() res) {
    const captcha = svgCaptcha.create({
      size: 4, //生成几个验证码
      fontSize: 50, //文字大小
      width: 100, //宽度
      height: 34, //高度
      background: '#cc9966', //背景颜色
    });
    req.session.code = captcha.text; //存储验证码记录到session
    res.type('image/svg+xml');
    res.send(captcha.data);
  }

  @Post('create')
  createUser(@Req() req, @Body() body) {
    console.log(req.session.code, body);
    if (
      req.session.code.toLocaleLowerCase() === body?.code?.toLocaleLowerCase()
    ) {
      return {
        message: '验证码正确',
      };
    } else {
      return {
        message: '验证码错误',
      };
    }
  }

  @Post()
  create(@Body(PipePipe) createLoginDto: CreateLoginDto) {
    return this.loginService.create(createLoginDto);
  }

  @Get()
  @SetMetadata('role', ['admin'])
  findAll() {
    return this.loginService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: number) {
    console.log(typeof id, 'ID 类型');
    console.log(id, 'id-=-=-=-==-=--=-=');
    return this.loginService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: ParseIntPipe,
    @Body() updateLoginDto: UpdateLoginDto,
  ) {
    return this.loginService.update(+id, updateLoginDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.loginService.remove(+id);
  }
}
