import { SetMetadata } from '@nestjs/common';
import { AuthStrategies } from '../constant/constant';

export const SELECT_AUTH_KEY = 'select-auth';

export const Auths = (auth?: AuthStrategies) =>
  SetMetadata(SELECT_AUTH_KEY, auth);
