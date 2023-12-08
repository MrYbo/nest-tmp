import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from '@nestjs/common';
import {Reflector} from '@nestjs/core';
import _ from 'lodash';
import {AuthStrategyKey} from '../constant/constant';

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private reflector: Reflector) {
	}


	canActivate(context: ExecutionContext) {
		const requiredRoles = this.reflector.getAllAndOverride<string>(AuthStrategyKey.ROLES_KEY, [
			context.getHandler(),
			context.getClass(),
		]);

		console.log(requiredRoles)
		if (!requiredRoles) {
			return true;
		}

		const request = context.switchToHttp().getRequest();
		const user = request.user;

		if (!user) {
			throw new UnauthorizedException('您没有权限访问此资源。');
		}

		if (_.isArray(requiredRoles)) {
			console.log(requiredRoles, user)
			return requiredRoles.some((role) => user.role?.level === role);
		}

		return requiredRoles === user.role.level;
	}
}
