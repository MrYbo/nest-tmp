import { ManagerModel } from '../common/constant/constant';

export interface JwtPayloadStruct {
  sub: number;
  model: ManagerModel;
}
