import {IsEnum, IsMobilePhone, IsNotEmpty, Matches} from 'class-validator';
import {passwordRegex, RoleLevel, usernameRegex,} from '../../../common/constant/constant';
import {RegionIsExists} from '../../../validators/region.validator';

export class CreateAdminDto {
	@IsNotEmpty()
	@Matches(usernameRegex, {message: '用户名不符合规则'})
	username: string;

	@IsNotEmpty()
	@Matches(passwordRegex, {message: '密码不符合规则'})
	password: string;

	@IsNotEmpty()
	@IsMobilePhone('zh-CN', null, {message: '电话号码错误'})
	phone: string;

	@IsNotEmpty()
	@IsEnum(RoleLevel, {each: true})
	readonly role: RoleLevel;

	@RegionIsExists()
	region?: number;
}
