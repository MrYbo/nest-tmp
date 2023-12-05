export const usernameRegex: RegExp = /^[a-z\d][a-z\d-]*[a-z\d]$/;
export const passwordRegex: RegExp =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=(.*[\W]){2,})[\S]{8,16}$/;

export enum Role {
  superAdmin = 1,
  admin,
  regionAdmin,
  organizationAdmin,
  ordinaryUser,
}

export enum AuthStrategies {
  JWT = 'jwt',
  ADMIN_LOCAL = 'admin_local',
  MANAGER_LOCAL = 'manager_local',
  USER_LOCAL = 'user_local',
  NO = 'no',
}

export type ManagerModel = 'admin' | 'manager' | 'user';
