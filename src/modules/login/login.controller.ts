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
  NotFoundException,
} from '@nestjs/common';
import { LoginService } from './login.service';
import { CreateLoginDto } from './dto/create-login.dto';
import { UpdateLoginDto } from './dto/update-login.dto';
import { PipePipe } from './login.pipe';
import * as svgCaptcha from 'svg-captcha';
import * as uuid from 'uuid';
// import { LoginGuard } from './login.guard';
import { LoginDTO } from './dto/index';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiProperty,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
} from '@nestjs/swagger';
import { TokenResponse } from './results';
import { Public } from '@/decorator/index';

@Controller({ path: 'login', version: '1' })
@ApiTags('登录接口')
@ApiBearerAuth()
// @UseGuards(LoginGuard)
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Public()
  @ApiOperation({
    summary: '获取验证码',
    description: '请求该接口获取code验证码',
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

  @Post('')
  @Public()
  @ApiBody({ type: LoginDTO })
  @ApiOkResponse({ description: '登陆', type: TokenResponse })
  loginAdmin(@Req() req, @Body() body: LoginDTO) {
    const { mobile, password, code } = body;
    console.log('req.session', req.session);
    console.log('req.session', req.session);
    if (!req.session?.code) {
      throw new NotFoundException('验证码已过期，请刷新重试');
    }
    if (req.session.code.toLocaleLowerCase() !== code?.toLocaleLowerCase()) {
      throw new NotFoundException('验证码不正确，请刷新重试');
    }
    return this.loginService.login(body);
  }

  @Post('/add/tags')
  addTags(@Body() params: { tags: string[]; userId: number }) {
    return this.loginService.addTags(params);
  }

  @Get()
  @SetMetadata('role', ['admin'])
  findAll() {
    return this.loginService.findAll({ keyWord: 'lui', page: 1, pageSize: 10 });
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
