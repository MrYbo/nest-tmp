import {Injectable, UnauthorizedException} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {ExtractJwt, Strategy, StrategyOptions} from 'passport-jwt';
import {ConfigService} from '@nestjs/config';
import {JwtPayloadStruct} from '../../../interface/jwt-payload.struct';
import {AuthService} from '../auth.service';
import {AuthStrategies} from 'src/common/constant/constant';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, AuthStrategies.JWT) {
	constructor(
			private readonly authService: AuthService,
			private readonly configService: ConfigService,
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: configService.get('jwt.secret'),
		} as StrategyOptions);
	}

	async validate(payload: JwtPayloadStruct): Promise<any> {
		const {sub, role} = payload;
		if (!sub || typeof sub !== 'number') {
			throw new UnauthorizedException({message: '请登录'});
		}
		const user = await this.authService.findByPk(role, sub);
		if (!user) {
			throw new UnauthorizedException({message: '请登录'});
		}
		return user;
	}
}
