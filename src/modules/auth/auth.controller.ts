import {
  Body,
  Controller,
  Post,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { nth } from 'lodash';
import { ManagerModel } from '../../common/constant/constant';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post(['admin/login', 'manager/login'])
  async login(@Body() loginAuthDto: LoginAuthDto, @Req() req) {
    console.log(req.path);
    const model: ManagerModel = nth(req.path.split('/'), -2);
    const user = await this.authService.validateUser(model, loginAuthDto);
    if (!user) {
      throw new UnauthorizedException('username or password error');
    }
    const token: string = this.authService.issueToken('admin', user['id']);
    return {
      type: 'bearer',
      token,
    };
  }
}
