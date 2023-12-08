import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common';
import {Reflector} from '@nestjs/core';
import {AuthGuard as _AuthGuard, IAuthGuard} from '@nestjs/passport';
import {AuthStrategies, AuthStrategyKey} from '../constant/constant';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private reflector: Reflector) {
	}

	private static getAuthGuard(auth?: string): IAuthGuard {
		let guard: IAuthGuard;
		switch (auth) {
			case AuthStrategies.LOCAL:
				guard = new (_AuthGuard('local'))();
				break;
			case AuthStrategies.JWT:
				guard = new (_AuthGuard('jwt'))();
				break;
		}
		return guard;
	}

	canActivate(context: ExecutionContext) {
		const authType = this.reflector.getAllAndOverride<string>(AuthStrategyKey.BASE_KEY, [
			context.getHandler(),
			context.getClass(),
		]) || 'jwt';

		const isPublic = this.reflector.getAllAndOverride<string>(AuthStrategyKey.PUBLIC_KEY, [
			context.getHandler(),
			context.getClass(),
		]);

		if (isPublic) {
			return true;
		}
		console.log(authType)

		const guard = AuthGuard.getAuthGuard(authType);
		return guard.canActivate(context);
	}
}
