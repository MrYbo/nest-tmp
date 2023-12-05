import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { AuthStrategies } from 'src/common/constant/constant';

@Injectable()
export class AdminLocalStrategy extends PassportStrategy(
  Strategy,
  AuthStrategies.ADMIN_LOCAL,
) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'username',
      passwordField: 'password',
    });
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(
      'admin',
      username,
      password,
    );
    if (!user) throw new UnauthorizedException('账号或密码错误');
    return user;
  }
}

@Injectable()
export class ManagerLocalStrategy extends PassportStrategy(
  Strategy,
  AuthStrategies.ADMIN_LOCAL,
) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'username',
      passwordField: 'password',
    });
  }

  async validate(username: string, password: string): Promise<any> {}
}
