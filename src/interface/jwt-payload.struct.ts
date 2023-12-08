import {RoleModel} from '../common/constant/constant';

export interface JwtPayloadStruct {
	sub: number;
	role: RoleModel;
}
