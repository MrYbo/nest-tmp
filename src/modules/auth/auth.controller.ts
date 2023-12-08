import {Controller, Post, Request} from '@nestjs/common';
import _ from 'lodash';
import {AuthService} from './auth.service';
import {LocalAuth} from "../../common/decorators/local-auth.decorator";

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {
	}

	@LocalAuth()
	@Post(['admin/login', 'manager/login'])
	async login(@Request() req) {
		const user = req.user;
		console.log(user)
		const role = _.get(user, 'constructor.name').toLowerCase();
		const token = this.authService.issueToken(role, user);
		return {
			type: 'bearer',
			token,
		};
	}
}
