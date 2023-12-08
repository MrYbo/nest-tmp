export const usernameRegex: RegExp = /^(?!-)[a-z0-9-]{5,}(?<!-)$/; // 只能包含小写字母、数字和中划线 - ，且中划线不能作为用户名的第一个和最后一个字符，并且用户名至少为 5 位
export const passwordRegex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=(.*[\W]){2,})[\S]{8,16}$/;

export enum RoleLevel {
	superAdmin = 1,
	admin,
	regionAdmin,
	organizationAdmin,
	ordinaryUser,
}

export enum AuthStrategies {
	JWT = 'jwt',
	PUBLIC = 'public',
	LOCAL = 'local',
}

export enum AuthStrategyKey {
	ROLES_KEY = 'roles',
	BASE_KEY = 'localOrJwt',
	PUBLIC_KEY = 'isPublic'
}

export type RoleModel = 'admin' | 'manager' | 'user';
