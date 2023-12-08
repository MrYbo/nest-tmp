import {Injectable, UnauthorizedException} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {Strategy} from 'passport-local';
import _ from 'lodash';
import {AuthService} from '../auth.service';
import {AuthStrategies} from 'src/common/constant/constant';
import {LoginAuthDto} from '../dto/login-auth.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, AuthStrategies.LOCAL) {
	constructor(
			private readonly authService: AuthService,
	) {
		super({
			passReqToCallback: true,
		});
	}

	async validate(request: Request, username: string, password: string): Promise<any> {
		const role: string = _.nth(request.url.split('/'), -2);
		const lat: LoginAuthDto = {username, password};
		const user = await this.authService.validateUser(role, lat);
		if (!user) {
			throw new UnauthorizedException('账号或密码错误');
		}
		return user;
	}
}
