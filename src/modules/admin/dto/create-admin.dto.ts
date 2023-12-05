import { IsEnum, IsMobilePhone, IsNotEmpty, Matches } from 'class-validator';
import { Role, usernameRegex } from '../../../common/constant/constant';

export class CreateAdminDto {
  @IsNotEmpty()
  @Matches(usernameRegex)
  username: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsMobilePhone('zh-CN')
  phone: string;

  @IsNotEmpty()
  @IsEnum(Role, { each: true })
  readonly role: Role;
}
