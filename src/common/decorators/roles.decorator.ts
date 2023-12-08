import {AuthStrategyKey, RoleLevel} from '../constant/constant';
import {SetMetadata} from '@nestjs/common';

export const Roles = (roles: RoleLevel[] | RoleLevel) => SetMetadata(AuthStrategyKey.ROLES_KEY, roles);
